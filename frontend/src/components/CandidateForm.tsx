import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { candidateService, Candidate } from '../services/candidateService';
import { useToast } from '../context/ToastContext';

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
  const { addToast } = useToast();

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
      addToast('success', 'Candidate created successfully', 5000);
      reset();
      setCvFile(null);
    } catch (err) {
      addToast('error', err instanceof Error ? err.message : 'Failed to create candidate', 8000);
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
        addToast('error', 'Only PDF and DOCX files are allowed', 8000);
        return;
      }
      
      // Validate file size (10MB limit)
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        addToast('error', 'File size must be less than 10MB', 8000);
        return;
      }
      
      setCvFile(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md" aria-labelledby="form-title">
      <h2 id="form-title" className="text-2xl font-bold text-gray-900 mb-6">Add New Candidate</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="form-group">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
          <input
            id="firstName"
            type="text"
            {...register('firstName')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
            disabled={loading}
            aria-invalid={errors.firstName ? 'true' : 'false'}
            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
          />
          {errors.firstName && <span id="firstName-error" className="text-sm text-red-600 mt-1 animate-fade-in" role="alert">{errors.firstName.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
          <input
            id="lastName"
            type="text"
            {...register('lastName')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
            disabled={loading}
            aria-invalid={errors.lastName ? 'true' : 'false'}
            aria-describedby={errors.lastName ? 'lastName-error' : undefined}
          />
          {errors.lastName && <span id="lastName-error" className="text-sm text-red-600 mt-1 animate-fade-in" role="alert">{errors.lastName.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            disabled={loading}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && <span id="email-error" className="text-sm text-red-600 mt-1 animate-fade-in" role="alert">{errors.email.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
          <input
            id="phone"
            type="tel"
            {...register('phone')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            disabled={loading}
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && <span id="phone-error" className="text-sm text-red-600 mt-1 animate-fade-in" role="alert">{errors.phone.message}</span>}
        </div>

        <div className="form-group md:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input
            id="address"
            type="text"
            {...register('address')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out"
            disabled={loading}
          />
        </div>
      </div>

      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Education</h3>
        {educationFields.map((field, index) => (
          <div key={field.id} className="mb-4 p-4 bg-white rounded-md border border-gray-200 animate-slide-down" role="group" aria-labelledby={`education-${index}-title`}>
            <h4 id={`education-${index}-title`} className="sr-only">Education Entry {index + 1}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor={`education-${index}-institution`} className="block text-sm font-medium text-gray-700 mb-1">Institution *</label>
                <input
                  id={`education-${index}-institution`}
                  {...register(`education.${index}.institution`)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out"
                  disabled={loading}
                  aria-required="true"
                />
              </div>
              <div className="form-group">
                <label htmlFor={`education-${index}-degree`} className="block text-sm font-medium text-gray-700 mb-1">Degree *</label>
                <input
                  id={`education-${index}-degree`}
                  {...register(`education.${index}.degree`)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out"
                  disabled={loading}
                  aria-required="true"
                />
              </div>
              <div className="form-group">
                <label htmlFor={`education-${index}-fieldOfStudy`} className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                <input
                  id={`education-${index}-fieldOfStudy`}
                  {...register(`education.${index}.fieldOfStudy`)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out"
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`education-${index}-startDate`} className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                <input
                  id={`education-${index}-startDate`}
                  type="date"
                  {...register(`education.${index}.startDate`)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out"
                  disabled={loading}
                  aria-required="true"
                />
              </div>
              <div className="form-group md:col-span-2">
                <label htmlFor={`education-${index}-endDate`} className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  id={`education-${index}-endDate`}
                  type="date"
                  {...register(`education.${index}.endDate`)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out"
                  disabled={loading}
                />
              </div>
            </div>
            <button type="button" onClick={() => removeEducation(index)} disabled={loading} className="mt-3 px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors" aria-label={`Remove education entry ${index + 1}`}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => appendEducation({ institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' })} disabled={loading} className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors" aria-label="Add education entry">
          Add Education
        </button>
      </div>

      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Work Experience</h3>
        {experienceFields.map((field, index) => (
          <div key={field.id} className="mb-4 p-4 bg-white rounded-md border border-gray-200 animate-slide-down" role="group" aria-labelledby={`experience-${index}-title`}>
            <h4 id={`experience-${index}-title`} className="sr-only">Work Experience Entry {index + 1}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor={`experience-${index}-company`} className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                <input
                  id={`experience-${index}-company`}
                  {...register(`experience.${index}.company`)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out"
                  disabled={loading}
                  aria-required="true"
                />
              </div>
              <div className="form-group">
                <label htmlFor={`experience-${index}-position`} className="block text-sm font-medium text-gray-700 mb-1">Position *</label>
                <input
                  id={`experience-${index}-position`}
                  {...register(`experience.${index}.position`)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out"
                  disabled={loading}
                  aria-required="true"
                />
              </div>
              <div className="form-group">
                <label htmlFor={`experience-${index}-startDate`} className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                <input
                  id={`experience-${index}-startDate`}
                  type="date"
                  {...register(`experience.${index}.startDate`)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out"
                  disabled={loading}
                  aria-required="true"
                />
              </div>
              <div className="form-group">
                <label htmlFor={`experience-${index}-endDate`} className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  id={`experience-${index}-endDate`}
                  type="date"
                  {...register(`experience.${index}.endDate`)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out"
                  disabled={loading}
                />
              </div>
              <div className="form-group md:col-span-2">
                <label htmlFor={`experience-${index}-description`} className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  id={`experience-${index}-description`}
                  {...register(`experience.${index}.description`)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out"
                  disabled={loading}
                  rows={3}
                />
              </div>
            </div>
            <button type="button" onClick={() => removeExperience(index)} disabled={loading} className="mt-3 px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors" aria-label={`Remove work experience entry ${index + 1}`}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => appendExperience({ company: '', position: '', startDate: '', endDate: '', description: '' })} disabled={loading} className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors" aria-label="Add work experience entry">
          Add Experience
        </button>
      </div>

      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">CV Upload</h3>
        <div className="form-group">
          <label htmlFor="cv" className="block text-sm font-medium text-gray-700 mb-1">Upload CV (PDF or DOCX, max 10MB)</label>
          <input
            id="cv"
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out"
            aria-describedby="cv-help"
          />
          <span id="cv-help" className="sr-only">Accepted file types: PDF and DOCX. Maximum file size: 10MB</span>
          {cvFile && <span className="text-sm text-gray-600 mt-1" aria-live="polite">{cvFile.name}</span>}
        </div>
      </div>

      <button type="submit" disabled={loading} className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" aria-busy={loading}>
        {loading ? 'Adding Candidate...' : 'Add Candidate'}
      </button>
    </form>
  );
};

export default CandidateForm;
