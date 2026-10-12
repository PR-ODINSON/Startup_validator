import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { submitIdea } from '../api/client';

const INITIAL_FORM = {
  title: '',
  description: '',
  domain: '',
  stage: '',
  type: '',
};

const SubmitIdea = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
      };

      if (form.domain.trim()) payload.domain = form.domain.trim();
      if (form.stage.trim()) payload.stage = form.stage.trim();
      if (form.type.trim()) payload.type = form.type.trim();

      const data = await submitIdea(payload);
      navigate(`/results/${data.id}`);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        'Failed to submit idea. Please try again.';
      setError(Array.isArray(message) ? message.join(', ') : message);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 pt-24 pb-16">
      <div className="container-custom max-w-2xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-orange-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
          Validate your idea
        </h1>
        <p className="text-slate-600 mb-8">
          Tell us about your startup. Our AI agents will analyze market fit,
          competition, business model, and pitch strength.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-2">
              Title <span className="text-orange-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. AI-powered meal planning for busy parents"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-2">
              Description <span className="text-orange-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={5}
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the problem, your solution, and who you serve..."
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white resize-y"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="domain" className="block text-sm font-semibold text-slate-700 mb-2">
                Domain
              </label>
              <input
                id="domain"
                name="domain"
                type="text"
                value={form.domain}
                onChange={handleChange}
                placeholder="Fintech, Health..."
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              />
            </div>
            <div>
              <label htmlFor="stage" className="block text-sm font-semibold text-slate-700 mb-2">
                Stage
              </label>
              <input
                id="stage"
                name="stage"
                type="text"
                value={form.stage}
                onChange={handleChange}
                placeholder="Idea, MVP..."
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-semibold text-slate-700 mb-2">
                Type
              </label>
              <input
                id="type"
                name="type"
                type="text"
                value={form.type}
                onChange={handleChange}
                placeholder="B2B, B2C..."
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full md:w-auto flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              'Start validation'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitIdea;
