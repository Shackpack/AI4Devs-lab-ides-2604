import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { candidateService, Candidate } from '../services/candidateService';

// Education schema
const educationSchema = z.object({
  institution: z.string().min(1, 'Institution is required'),
  degree: z.string().min(1, 'Degree is required'),
  fieldOfStudy: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
});

// Experience schema
const experienceSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  position: z.string().min(1, 'Position is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

// Candidate schema
const candidateSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  phone: z.string().min(1, 'Phone is required'),
  address: z.string().optional(),
  education: z.array(educationSchema).optional(),
  experience: z.array(experienceSchema).optional(),
});

type CandidateFormData = z.infer<typeof candidateSchema>;

const CandidateForm: React.FC = () => {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<CandidateFormData>({
    resolver: zodResolver(candidateSchema),
    defaultValues: {
      education: [],
      experience: [],
    },
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control,
    name: 'education',
  });

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control,
    name: 'experience',
  });

  const onSubmit = async (data: CandidateFormData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const candidateData: Candidate = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        education: data.education,
        experience: data.experience,
      };

      await candidateService.createCandidate(candidateData);
      setSuccess(true);
      reset();
      setCvFile(null);
      
      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create candidate');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type (PDF, DOCX only)
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setError('Only PDF and DOCX files are allowed');
        return;
      }
      
      // Validate file size (10MB limit)
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        setError('File size must be less than 10MB');
        return;
      }
      
      setCvFile(file);
      setError(null);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="candidate-form" role="form" aria-labelledby="form-title">
      <h2 id="form-title">Add New Candidate</h2>
      
      {success && (
        <div className="alert alert-success" role="alert" aria-live="polite">
          Candidate created successfully!
        </div>
      )}
      
      {error && (
        <div className="alert alert-error" role="alert" aria-live="assertive">
          {error}
        </div>
      )}
      
      <div className="form-group">
        <label htmlFor="firstName">First Name *</label>
        <input
          id="firstName"
          type="text"
          {...register('firstName')}
          className={errors.firstName ? 'error' : ''}
          disabled={loading}
          aria-invalid={errors.firstName ? 'true' : 'false'}
          aria-describedby={errors.firstName ? 'firstName-error' : undefined}
        />
        {errors.firstName && <span id="firstName-error" className="error-message" role="alert">{errors.firstName.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Last Name *</label>
        <input
          id="lastName"
          type="text"
          {...register('lastName')}
          className={errors.lastName ? 'error' : ''}
          disabled={loading}
          aria-invalid={errors.lastName ? 'true' : 'false'}
          aria-describedby={errors.lastName ? 'lastName-error' : undefined}
        />
        {errors.lastName && <span id="lastName-error" className="error-message" role="alert">{errors.lastName.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={errors.email ? 'error' : ''}
          disabled={loading}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && <span id="email-error" className="error-message" role="alert">{errors.email.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone *</label>
        <input
          id="phone"
          type="tel"
          {...register('phone')}
          className={errors.phone ? 'error' : ''}
          disabled={loading}
          aria-invalid={errors.phone ? 'true' : 'false'}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
        />
        {errors.phone && <span id="phone-error" className="error-message" role="alert">{errors.phone.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          {...register('address')}
          disabled={loading}
        />
      </div>

      <div className="section">
        <h3>Education</h3>
        {educationFields.map((field, index) => (
          <div key={field.id} className="dynamic-field" role="group" aria-labelledby={`education-${index}-title`}>
            <h4 id={`education-${index}-title`} className="visually-hidden">Education Entry {index + 1}</h4>
            <div className="form-group">
              <label htmlFor={`education-${index}-institution`}>Institution *</label>
              <input
                id={`education-${index}-institution`}
                {...register(`education.${index}.institution`)}
                disabled={loading}
                aria-required="true"
              />
            </div>
            <div className="form-group">
              <label htmlFor={`education-${index}-degree`}>Degree *</label>
              <input
                id={`education-${index}-degree`}
                {...register(`education.${index}.degree`)}
                disabled={loading}
                aria-required="true"
              />
            </div>
            <div className="form-group">
              <label htmlFor={`education-${index}-fieldOfStudy`}>Field of Study</label>
              <input
                id={`education-${index}-fieldOfStudy`}
                {...register(`education.${index}.fieldOfStudy`)}
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`education-${index}-startDate`}>Start Date *</label>
              <input
                id={`education-${index}-startDate`}
                type="date"
                {...register(`education.${index}.startDate`)}
                disabled={loading}
                aria-required="true"
              />
            </div>
            <div className="form-group">
              <label htmlFor={`education-${index}-endDate`}>End Date</label>
              <input
                id={`education-${index}-endDate`}
                type="date"
                {...register(`education.${index}.endDate`)}
                disabled={loading}
              />
            </div>
            <button type="button" onClick={() => removeEducation(index)} disabled={loading} aria-label={`Remove education entry ${index + 1}`}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => appendEducation({ institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' })} disabled={loading} aria-label="Add education entry">
          Add Education
        </button>
      </div>

      <div className="section">
        <h3>Work Experience</h3>
        {experienceFields.map((field, index) => (
          <div key={field.id} className="dynamic-field" role="group" aria-labelledby={`experience-${index}-title`}>
            <h4 id={`experience-${index}-title`} className="visually-hidden">Work Experience Entry {index + 1}</h4>
            <div className="form-group">
              <label htmlFor={`experience-${index}-company`}>Company *</label>
              <input
                id={`experience-${index}-company`}
                {...register(`experience.${index}.company`)}
                disabled={loading}
                aria-required="true"
              />
            </div>
            <div className="form-group">
              <label htmlFor={`experience-${index}-position`}>Position *</label>
              <input
                id={`experience-${index}-position`}
                {...register(`experience.${index}.position`)}
                disabled={loading}
                aria-required="true"
              />
            </div>
            <div className="form-group">
              <label htmlFor={`experience-${index}-startDate`}>Start Date *</label>
              <input
                id={`experience-${index}-startDate`}
                type="date"
                {...register(`experience.${index}.startDate`)}
                disabled={loading}
                aria-required="true"
              />
            </div>
            <div className="form-group">
              <label htmlFor={`experience-${index}-endDate`}>End Date</label>
              <input
                id={`experience-${index}-endDate`}
                type="date"
                {...register(`experience.${index}.endDate`)}
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`experience-${index}-description`}>Description</label>
              <textarea
                id={`experience-${index}-description`}
                {...register(`experience.${index}.description`)}
                disabled={loading}
              />
            </div>
            <button type="button" onClick={() => removeExperience(index)} disabled={loading} aria-label={`Remove work experience entry ${index + 1}`}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => appendExperience({ company: '', position: '', startDate: '', endDate: '', description: '' })} disabled={loading} aria-label="Add work experience entry">
          Add Experience
        </button>
      </div>

      <div className="section">
        <h3>CV Upload</h3>
        <div className="form-group">
          <label htmlFor="cv">Upload CV (PDF or DOCX, max 10MB)</label>
          <input
            id="cv"
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            disabled={loading}
            aria-describedby="cv-help"
          />
          <span id="cv-help" className="visually-hidden">Accepted file types: PDF and DOCX. Maximum file size: 10MB</span>
          {cvFile && <span className="file-name" aria-live="polite">{cvFile.name}</span>}
        </div>
      </div>

      <button type="submit" disabled={loading} aria-busy={loading}>
        {loading ? 'Adding Candidate...' : 'Add Candidate'}
      </button>
    </form>
  );
};

export default CandidateForm;
