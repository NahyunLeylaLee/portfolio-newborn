/**
 * Survey Creation Demo - Standalone Version
 * 
 * A completely independent demo page for survey creation
 * No Redux required - uses only local React state
 * 
 * Easy to integrate into any React project
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionType } from '../__generated__/globalTypes';
import { IOption, IQuestion, ISurvey } from '../__generated__/interfaces';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface QuestionTypeOption {
  value: QuestionType;
  label: string;
}

const QUESTION_TYPE_OPTIONS: QuestionTypeOption[] = [
  { value: QuestionType.SHORT_ANSWER, label: 'Short Answer' },
  { value: QuestionType.LONG_ANSWER, label: 'Paragraph' },
  { value: QuestionType.MULTIPLE_CHOICE, label: 'Multiple Choice' },
  { value: QuestionType.CHECKBOXES, label: 'Checkboxes' },
  { value: QuestionType.DROP_DOWN, label: 'Dropdown' },
  { value: QuestionType.LINEAR_SCALE, label: 'Linear Scale' },
  { value: QuestionType.RADIO_GRID, label: 'Multiple Choice Grid' },
  { value: QuestionType.CHECKBOX_GRID, label: 'Checkbox Grid' },
  { value: QuestionType.DATE_ANSWER, label: 'Date' },
  { value: QuestionType.TIME_ANSWER, label: 'Time' },
  { value: QuestionType.FILE_UPLOAD, label: 'File Upload' },
  { value: QuestionType.ADDRESS_ANSWER, label: 'Address' },
];

// ============================================================================
// MINI COMPONENTS
// ============================================================================

interface QuestionComponentProps {
  question: IQuestion;
  options: IOption[];
  onUpdateQuestion: (updates: Partial<IQuestion>) => void;
  onUpdateOption: (optionOrder: number, title: string, isRow?: boolean) => void;
  onAddOption: (isRow?: boolean) => void;
  onAddOtherOption: () => void;
  onRemoveOption: (optionOrder: number) => void;
  onDeleteQuestion: () => void;
  onRecreateLinearScale: (min: number, max: number) => void;
  isFirst: boolean;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  question,
  options,
  onUpdateQuestion,
  onUpdateOption,
  onAddOption,
  onAddOtherOption,
  onRemoveOption,
  onDeleteQuestion,
  onRecreateLinearScale,
  isFirst,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  // Check if "Other" option exists (order: 999)
  const hasOtherOption = options.some(opt => opt.order === 999);
  const canAddOther = [QuestionType.MULTIPLE_CHOICE, QuestionType.CHECKBOXES].includes(question.type);

  const renderOptions = () => {
    const type = question.type;

    // Text input types
    if ([QuestionType.SHORT_ANSWER, QuestionType.LONG_ANSWER].includes(type)) {
      return (
        <div className="mt-4 text-body-text">
          <div className="border-b border-brand-300 p-2">
            {type === QuestionType.SHORT_ANSWER ? 'Short answer text' : 'Long answer text'}
          </div>
        </div>
      );
    }

    // Date, Time, File, Address
    if ([QuestionType.DATE_ANSWER, QuestionType.TIME_ANSWER, QuestionType.FILE_UPLOAD, QuestionType.ADDRESS_ANSWER].includes(type)) {
      const labels: Record<string, string> = {
        [QuestionType.DATE_ANSWER]: 'Year, Month, Day',
        [QuestionType.TIME_ANSWER]: 'Time',
        [QuestionType.FILE_UPLOAD]: '📎 Add file',
        [QuestionType.ADDRESS_ANSWER]: '📍 Find address',
      };
      return (
        <div className="mt-4 text-body-text">
          <div className="border-b border-brand-300 p-2">{labels[type]}</div>
        </div>
      );
    }

    // Linear Scale
    if (type === QuestionType.LINEAR_SCALE) {
      // Get min and max from options
      const optionNumbers = options.map(o => Number(o.title)).filter(n => !isNaN(n));
      const currentMin = optionNumbers.length > 0 ? Math.min(...optionNumbers) : 1;
      const currentMax = optionNumbers.length > 0 ? Math.max(...optionNumbers) : 5;
      
      // Available options for min and max
      const minOptions = [0, 1];
      const maxOptions = [2, 3, 4, 5, 6, 7, 8, 9, 10];
      
      const handleMinChange = (newMin: number) => {
        // Recreate options with new range (min to currentMax)
        onRecreateLinearScale(newMin, currentMax);
      };
      
      const handleMaxChange = (newMax: number) => {
        // Recreate options with new range (currentMin to max)
        onRecreateLinearScale(currentMin, newMax);
      };
      
      return (
        <div className="mt-4">
          {/* Min/Max Selection */}
          <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
            <select
              className="border border-brand-300 rounded-lg px-3 py-2 focus:border-brand-800 focus:outline-none"
              value={currentMin}
              onChange={(e) => handleMinChange(Number(e.target.value))}
            >
              {minOptions.map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
            <span className="text-body-text">to</span>
            <select
              className="border border-brand-300 rounded-lg px-3 py-2 focus:border-brand-800 focus:outline-none"
              value={currentMax}
              onChange={(e) => handleMaxChange(Number(e.target.value))}
            >
              {maxOptions.map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>
          
          {/* Labels */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm text-body-text w-8">{currentMin}</span>
              <input
                type="text"
                className="border border-brand-300 rounded-lg px-3 py-2 w-full md:w-1/2 focus:border-brand-800 focus:outline-none"
                placeholder="Label (optional)"
                value={question.minLabel || ''}
                onChange={(e) => onUpdateQuestion({ minLabel: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-body-text w-8">{currentMax}</span>
              <input
                type="text"
                className="border border-brand-300 rounded-lg px-3 py-2 w-full md:w-1/2 focus:border-brand-800 focus:outline-none"
                placeholder="Label (optional)"
                value={question.maxLabel || ''}
                onChange={(e) => onUpdateQuestion({ maxLabel: e.target.value })}
              />
            </div>
          </div>
        </div>
      );
    }

    // Grid types
    if ([QuestionType.RADIO_GRID, QuestionType.CHECKBOX_GRID].includes(type)) {
      const rows = options.filter((o) => o.isRow);
      const cols = options.filter((o) => !o.isRow);

      return (
        <div className="mt-4">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
            <div>
              <div className="font-semibold mb-2 text-heading-dark">Rows</div>
              {rows.map((row) => (
                <div key={row.order} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    className="border border-brand-300 rounded-lg px-2 py-1 flex-1 focus:border-brand-800 focus:outline-none"
                    value={row.title}
                    onChange={(e) => onUpdateOption(row.order, e.target.value, true)}
                    placeholder="Row"
                  />
                  {rows.length > 1 && (
                    <button
                      onClick={() => onRemoveOption(row.order)}
                      className="text-red-600 hover:text-red-800"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => onAddOption(true)}
                className="text-brand-800 text-sm hover:text-brand-900 font-medium"
              >
                + Add row
              </button>
            </div>
            <div>
              <div className="font-semibold mb-2 text-heading-dark">Columns</div>
              {cols.map((col) => (
                <div key={col.order} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    className="border border-brand-300 rounded-lg px-2 py-1 flex-1 focus:border-brand-800 focus:outline-none"
                    value={col.title}
                    onChange={(e) => onUpdateOption(col.order, e.target.value, false)}
                    placeholder="Column"
                  />
                  {cols.length > 1 && (
                    <button
                      onClick={() => onRemoveOption(col.order)}
                      className="text-red-600 hover:text-red-800"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => onAddOption(false)}
                className="text-brand-800 text-sm hover:text-brand-900 font-medium"
              >
                + Add column
              </button>
            </div>
          </div>
        </div>
      );
    }

    // List types (Multiple choice, Checkboxes, Dropdown)
    if ([QuestionType.MULTIPLE_CHOICE, QuestionType.CHECKBOXES, QuestionType.DROP_DOWN].includes(type)) {
      const icon = type === QuestionType.MULTIPLE_CHOICE ? '○' : type === QuestionType.CHECKBOXES ? '☐' : '';
      
      // Sort options: regular options first, then "Other" option (999) at the end
      const sortedOptions = [...options].sort((a, b) => {
        if (a.order === 999) return 1;
        if (b.order === 999) return -1;
        return a.order - b.order;
      });
      
      return (
        <div className="mt-4 space-y-2">
          {sortedOptions.map((option, index) => (
            <div key={option.order} className="flex items-center gap-2">
              {icon && <span className="text-brand-600">{icon}</span>}
              {!icon && <span className="text-brand-600">{option.order === 999 ? '' : `${index + 1}.`}</span>}
              <input
                type="text"
                className="border border-brand-300 rounded-lg px-3 py-2 flex-1 focus:border-brand-800 focus:outline-none"
                value={option.title}
                onChange={(e) => onUpdateOption(option.order, e.target.value)}
                placeholder={option.order === 999 ? 'Other' : `Option ${index + 1}`}
                disabled={option.order === 999}
              />
              {(options.length > 1 || option.order === 999) && (
                <button
                  onClick={() => onRemoveOption(option.order)}
                  className="text-red-600 hover:text-red-800 px-2"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <div className="flex items-center gap-2 ml-6">
            <button
              onClick={() => onAddOption()}
              className="text-brand-800 text-sm hover:text-brand-900 font-medium"
            >
              + Add option
            </button>
            {canAddOther && !hasOtherOption && (
              <>
                <span className="text-body-text">or</span>
                <button
                  onClick={onAddOtherOption}
                  className="text-brand-800 text-sm hover:text-brand-900 font-medium"
                >
                  Add "Other"
                </button>
              </>
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className={`border rounded-2xl p-6 mb-4 bg-white transition-all ${
        isFocused ? 'shadow-xl border-brand-800' : 'border-brand-200 shadow-md'
      }`}
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsFocused(false);
        }
      }}
      tabIndex={0}
    >
      {/* Question Header */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <select
          className="border border-brand-300 rounded-lg px-3 py-2 text-body-text focus:border-brand-800 focus:outline-none md:min-w-[200px] md:order-2"
          value={question.type}
          onChange={(e) => onUpdateQuestion({ type: e.target.value as QuestionType })}
        >
          {QUESTION_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="border-b-2 border-brand-300 focus:border-brand-800 outline-none flex-1 text-lg p-2 text-heading-dark md:order-1"
          value={question.title}
          onChange={(e) => onUpdateQuestion({ title: e.target.value })}
          placeholder="Question title"
        />
      </div>

      {/* Options */}
      {renderOptions()}

      {/* Footer */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-brand-200">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={question.isRequired}
            onChange={(e) => onUpdateQuestion({ isRequired: e.target.checked })}
            className="w-4 h-4 accent-brand-800"
          />
          <span className="text-sm text-body-text">Required</span>
        </label>
        
        {!isFirst && (
          <button
            onClick={onDeleteQuestion}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            🗑️ Delete question
          </button>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const SurveyCreator: React.FC = () => {
  const navigate = useNavigate();
  
  const [survey, setSurvey] = useState<ISurvey>({
    id: 'demo-survey',
    title: 'Demo Survey',
    description: 'Try out the survey creation features!',
    order: 1,
    isMain: true,
    isBasic: false,
    startSending: false,
    nextSectionId: 'submit',
    age: 12,
    term: 30,
  });

  const [questions, setQuestions] = useState<IQuestion[]>([
    {
      id: 'q-1',
      surveyId: 'demo-survey',
      type: QuestionType.MULTIPLE_CHOICE,
      title: 'Sample question',
      order: 1,
      isRequired: false,
      basedOnAnswer: false,
      minLabel: '',
      maxLabel: '',
    },
  ]);

  const [options, setOptions] = useState<IOption[]>([
    {
      surveyId: 'demo-survey',
      questionId: 'q-1',
      order: 1,
      title: 'Option 1',
      isRow: true,
    },
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [isInitialized, setIsInitialized] = useState(false);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleBackToMain = () => {
    navigate('/');
  };

  const loadTemplate = (templateType: string) => {
    setSelectedTemplate(templateType);
    setIsInitialized(true);

    // Reset
    setQuestions([]);
    setOptions([]);

    let newQuestions: IQuestion[] = [];
    let newOptions: IOption[] = [];

    switch (templateType) {
      case 'empty':
        setSurvey({
          ...survey,
          title: 'My Survey',
          description: 'Create your survey here',
        });
        newQuestions = [
          {
            id: 'q-1',
            surveyId: 'demo-survey',
            type: QuestionType.MULTIPLE_CHOICE,
            title: '',
            order: 1,
            isRequired: false,
            basedOnAnswer: false,
            minLabel: '',
            maxLabel: '',
          },
        ];
        newOptions = [
          { surveyId: 'demo-survey', questionId: 'q-1', order: 1, title: '', isRow: true },
        ];
        break;

      case 'basic':
        setSurvey({
          ...survey,
          title: 'Basic Survey',
          description: 'A simple survey with basic questions',
        });
        newQuestions = [
          {
            id: 'q-1',
            surveyId: 'demo-survey',
            type: QuestionType.SHORT_ANSWER,
            title: '',
            order: 1,
            isRequired: true,
            basedOnAnswer: false,
            minLabel: '',
            maxLabel: '',
          },
          {
            id: 'q-2',
            surveyId: 'demo-survey',
            type: QuestionType.MULTIPLE_CHOICE,
            title: '',
            order: 2,
            isRequired: true,
            basedOnAnswer: false,
            minLabel: '',
            maxLabel: '',
          },
          {
            id: 'q-3',
            surveyId: 'demo-survey',
            type: QuestionType.LONG_ANSWER,
            title: '',
            order: 3,
            isRequired: false,
            basedOnAnswer: false,
            minLabel: '',
            maxLabel: '',
          },
        ];
        newOptions = [
          { surveyId: 'demo-survey', questionId: 'q-2', order: 1, title: '', isRow: true },
          { surveyId: 'demo-survey', questionId: 'q-2', order: 2, title: '', isRow: true },
        ];
        break;

      case 'satisfaction':
        setSurvey({
          ...survey,
          title: 'Satisfaction Survey',
          description: 'Help us improve our service',
        });
        newQuestions = [
          {
            id: 'q-1',
            surveyId: 'demo-survey',
            type: QuestionType.LINEAR_SCALE,
            title: '',
            order: 1,
            isRequired: true,
            basedOnAnswer: false,
            minLabel: '',
            maxLabel: '',
          },
          {
            id: 'q-2',
            surveyId: 'demo-survey',
            type: QuestionType.CHECKBOXES,
            title: '',
            order: 2,
            isRequired: false,
            basedOnAnswer: false,
            minLabel: '',
            maxLabel: '',
          },
          {
            id: 'q-3',
            surveyId: 'demo-survey',
            type: QuestionType.LONG_ANSWER,
            title: '',
            order: 3,
            isRequired: false,
            basedOnAnswer: false,
            minLabel: '',
            maxLabel: '',
          },
        ];
        newOptions = [
          { surveyId: 'demo-survey', questionId: 'q-1', order: 1, title: '1', isRow: true },
          { surveyId: 'demo-survey', questionId: 'q-1', order: 2, title: '2', isRow: true },
          { surveyId: 'demo-survey', questionId: 'q-1', order: 3, title: '3', isRow: true },
          { surveyId: 'demo-survey', questionId: 'q-1', order: 4, title: '4', isRow: true },
          { surveyId: 'demo-survey', questionId: 'q-1', order: 5, title: '5', isRow: true },
          { surveyId: 'demo-survey', questionId: 'q-2', order: 1, title: '', isRow: true },
          { surveyId: 'demo-survey', questionId: 'q-2', order: 2, title: '', isRow: true },
          { surveyId: 'demo-survey', questionId: 'q-2', order: 3, title: '', isRow: true },
        ];
        break;

      case 'allTypes':
        setSurvey({
          ...survey,
          title: 'All Question Types Demo',
          description: 'Experience all 12 question types',
        });
        let qOrder = 1;
        QUESTION_TYPE_OPTIONS.forEach((qtOpt) => {
          const q: IQuestion = {
            id: `q-${qOrder}`,
            surveyId: 'demo-survey',
            type: qtOpt.value,
            title: '',
            order: qOrder,
            isRequired: false,
            basedOnAnswer: false,
            minLabel: '',
            maxLabel: '',
          };
          newQuestions.push(q);

          // Add options based on type
          if ([QuestionType.MULTIPLE_CHOICE, QuestionType.CHECKBOXES, QuestionType.DROP_DOWN].includes(qtOpt.value)) {
            newOptions.push(
              { surveyId: 'demo-survey', questionId: q.id, order: 1, title: '', isRow: true },
              { surveyId: 'demo-survey', questionId: q.id, order: 2, title: '', isRow: true },
              { surveyId: 'demo-survey', questionId: q.id, order: 3, title: '', isRow: true }
            );
          } else if (qtOpt.value === QuestionType.LINEAR_SCALE) {
            for (let i = 1; i <= 5; i++) {
              newOptions.push({ surveyId: 'demo-survey', questionId: q.id, order: i, title: String(i), isRow: true });
            }
          } else if ([QuestionType.RADIO_GRID, QuestionType.CHECKBOX_GRID].includes(qtOpt.value)) {
            newOptions.push(
              { surveyId: 'demo-survey', questionId: q.id, order: 1, title: '', isRow: true },
              { surveyId: 'demo-survey', questionId: q.id, order: 2, title: '', isRow: true },
              { surveyId: 'demo-survey', questionId: q.id, order: 101, title: '', isRow: false },
              { surveyId: 'demo-survey', questionId: q.id, order: 102, title: '', isRow: false }
            );
          }

          qOrder++;
        });
        break;
    }

    setQuestions(newQuestions);
    setOptions(newOptions);
  };

  const addQuestion = () => {
    const newOrder = questions.length + 1;
    const newQuestion: IQuestion = {
      id: `q-${newOrder}`,
      surveyId: 'demo-survey',
      type: QuestionType.MULTIPLE_CHOICE,
      title: '',
      order: newOrder,
      isRequired: false,
      basedOnAnswer: false,
      minLabel: '',
      maxLabel: '',
    };
    setQuestions([...questions, newQuestion]);
    setOptions([
      ...options,
      {
        surveyId: 'demo-survey',
        questionId: newQuestion.id,
        order: 1,
        title: '',
        isRow: true,
      },
    ]);
  };

  const updateQuestion = (questionId: string | number, updates: Partial<IQuestion>) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          const updatedQuestion = { ...q, ...updates };
          
          // If type changed, reset options
          if (updates.type && updates.type !== q.type) {
            resetOptionsForQuestion(questionId, updates.type);
          }
          
          return updatedQuestion;
        }
        return q;
      })
    );
  };

  const resetOptionsForQuestion = (questionId: string | number, newType: QuestionType) => {
    // Remove old options
    const filteredOptions = options.filter((o) => o.questionId !== questionId);

    // Add new default options based on type
    let newOptions: IOption[] = [];
    
    if ([QuestionType.MULTIPLE_CHOICE, QuestionType.CHECKBOXES, QuestionType.DROP_DOWN].includes(newType)) {
      newOptions = [
        { surveyId: 'demo-survey', questionId, order: 1, title: '', isRow: true },
      ];
    } else if (newType === QuestionType.LINEAR_SCALE) {
      for (let i = 1; i <= 5; i++) {
        newOptions.push({ surveyId: 'demo-survey', questionId, order: i, title: String(i), isRow: true });
      }
    } else if ([QuestionType.RADIO_GRID, QuestionType.CHECKBOX_GRID].includes(newType)) {
      newOptions = [
        { surveyId: 'demo-survey', questionId, order: 1, title: '', isRow: true },
        { surveyId: 'demo-survey', questionId, order: 101, title: '', isRow: false },
      ];
    }

    setOptions([...filteredOptions, ...newOptions]);
  };

  const deleteQuestion = (questionId: string | number) => {
    setQuestions(questions.filter((q) => q.id !== questionId));
    setOptions(options.filter((o) => o.questionId !== questionId));
  };

  const updateOption = (questionId: string | number, optionOrder: number, title: string, isRow = true) => {
    setOptions(
      options.map((o) => {
        if (o.questionId === questionId && o.order === optionOrder && o.isRow === isRow) {
          return { ...o, title };
        }
        return o;
      })
    );
  };

  const addOption = (questionId: string | number, isRow = true) => {
    const questionOptions = options.filter((o) => o.questionId === questionId && o.isRow === isRow);
    // Exclude order 999 (Other option) when calculating max
    const maxOrder = Math.max(...questionOptions.filter(o => o.order !== 999).map((o) => o.order), isRow ? 0 : 100);
    const newOrder = maxOrder + 1;

    setOptions([
      ...options,
      {
        surveyId: 'demo-survey',
        questionId,
        order: newOrder,
        title: '',
        isRow,
      },
    ]);
  };

  const addOtherOption = (questionId: string | number) => {
    // Add "Other" option with order 999
    setOptions([
      ...options,
      {
        surveyId: 'demo-survey',
        questionId,
        order: 999,
        title: 'Other',
        isRow: true,
      },
    ]);
  };

  const removeOption = (questionId: string | number, optionOrder: number) => {
    setOptions(options.filter((o) => !(o.questionId === questionId && o.order === optionOrder)));
  };

  const recreateLinearScaleOptions = (questionId: string | number, min: number, max: number) => {
    // Remove old linear scale options
    const filteredOptions = options.filter((o) => o.questionId !== questionId);
    
    // Create new options from min to max
    const newOptions: IOption[] = [];
    const count = max - min + 1;
    for (let i = 0; i < count; i++) {
      newOptions.push({
        surveyId: 'demo-survey',
        questionId,
        order: i + 1,
        title: String(min + i),
        isRow: true,
      });
    }
    
    setOptions([...filteredOptions, ...newOptions]);
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="min-h-screen bg-page-bg py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back to Main Button */}
        <div className="mb-6">
          <button 
            onClick={handleBackToMain}
            className="inline-flex items-center gap-2 text-brand-800 hover:text-brand-900 font-semibold transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Main
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-heading-dark mb-3">📋 Survey Creation Demo</h1>
          <p className="text-body-text">Create surveys with various question types - No backend required!</p>
        </div>

        {/* Template Selection */}
        {!isInitialized && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-brand-200">
            <h2 className="text-2xl font-semibold text-heading-dark mb-4">Get Started</h2>
            <p className="text-body-text mb-6">Choose a template or start with a blank survey</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => loadTemplate('empty')}
                className="p-5 border-2 border-brand-600 rounded-xl hover:bg-brand-50 hover:border-brand-800 transition-all text-left"
              >
                <div className="font-semibold text-brand-800 text-lg mb-2">✨ Blank Survey</div>
                <div className="text-sm text-body-text">Start from scratch</div>
              </button>

              <button
                onClick={() => loadTemplate('basic')}
                className="p-5 border-2 border-brand-600 rounded-xl hover:bg-brand-50 hover:border-brand-800 transition-all text-left"
              >
                <div className="font-semibold text-brand-800 text-lg mb-2">📝 Basic Survey</div>
                <div className="text-sm text-body-text">Simple questions template</div>
              </button>

              <button
                onClick={() => loadTemplate('satisfaction')}
                className="p-5 border-2 border-brand-600 rounded-xl hover:bg-brand-50 hover:border-brand-800 transition-all text-left"
              >
                <div className="font-semibold text-brand-800 text-lg mb-2">⭐ Satisfaction Survey</div>
                <div className="text-sm text-body-text">Service evaluation survey</div>
              </button>

              <button
                onClick={() => loadTemplate('allTypes')}
                className="p-5 border-2 border-brand-600 rounded-xl hover:bg-brand-50 hover:border-brand-800 transition-all text-left"
              >
                <div className="font-semibold text-brand-800 text-lg mb-2">🎨 All Question Types</div>
                <div className="text-sm text-body-text">Experience all 12 question types</div>
              </button>
            </div>
          </div>
        )}

        {/* Survey Editor */}
        {isInitialized && (
          <>
            {/* Back button */}
            <div className="mb-6 flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-4">
              <div className="text-body-text">
                <span className="font-semibold">{survey.title}</span>
              </div>
              <button
                onClick={() => setIsInitialized(false)}
                className="px-4 py-2 bg-brand-800 text-white rounded-full hover:bg-brand-900 transition-colors shadow-md whitespace-nowrap"
              >
                ← Choose Another Template
              </button>
            </div>

            {/* Guide */}
            <div className="bg-accent-yellow border-l-4 border-brand-800 p-4 mb-6 rounded-lg">
              <p className="font-semibold text-heading-dark mb-2">💡 How to use:</p>
              <ul className="text-sm text-body-text space-y-1 ml-4 list-disc">
                <li>Click on question titles to edit them</li>
                <li>Change question types using the dropdown</li>
                <li>Add or remove options as needed</li>
                <li>Mark questions as required</li>
                <li>Add new questions using the button below</li>
              </ul>
            </div>

            {/* Survey Info */}
            <div className="bg-white border border-brand-200 rounded-2xl p-6 mb-6 shadow-lg">
              <input
                type="text"
                className="text-2xl font-bold w-full outline-none border-b-2 border-brand-300 focus:border-brand-800 mb-3 p-2 text-heading-dark"
                value={survey.title}
                onChange={(e) => setSurvey({ ...survey, title: e.target.value })}
                placeholder="Survey Title"
              />
              <textarea
                className="w-full outline-none text-body-text resize-none p-2"
                value={survey.description}
                onChange={(e) => setSurvey({ ...survey, description: e.target.value })}
                placeholder="Survey Description"
                rows={2}
              />
              <div className="flex gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <label className="text-body-text">Age (months):</label>
                  <input
                    type="number"
                    className="border border-brand-300 rounded-lg px-3 py-1 w-20 focus:border-brand-800 focus:outline-none"
                    value={survey.age || 0}
                    onChange={(e) => setSurvey({ ...survey, age: Number(e.target.value) })}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-body-text">Duration (days):</label>
                  <input
                    type="number"
                    className="border border-brand-300 rounded-lg px-3 py-1 w-20 focus:border-brand-800 focus:outline-none"
                    value={survey.term || 0}
                    onChange={(e) => setSurvey({ ...survey, term: Number(e.target.value) })}
                  />
                </div>
              </div>
            </div>

            {/* Questions */}
            {questions
              .sort((a, b) => a.order - b.order)
              .map((question, index) => (
                <QuestionComponent
                  key={question.id}
                  question={question}
                  options={options.filter((o) => o.questionId === question.id)}
                  onUpdateQuestion={(updates) => updateQuestion(question.id, updates)}
                  onUpdateOption={(order, title, isRow) => updateOption(question.id, order, title, isRow)}
                  onAddOption={(isRow) => addOption(question.id, isRow)}
                  onAddOtherOption={() => addOtherOption(question.id)}
                  onRemoveOption={(order) => removeOption(question.id, order)}
                  onDeleteQuestion={() => deleteQuestion(question.id)}
                  onRecreateLinearScale={(min, max) => recreateLinearScaleOptions(question.id, min, max)}
                  isFirst={index === 0}
                />
              ))}

            {/* Add Question Button */}
            <button
              onClick={addQuestion}
              className="w-full py-4 border-2 border-dashed border-brand-400 rounded-xl text-body-text hover:border-brand-800 hover:text-brand-800 hover:bg-brand-50 transition-all"
            >
              ➕ Add Question
            </button>

            {/* Footer Info */}
            <div className="mt-8 p-6 bg-white rounded-2xl border border-brand-200 shadow-lg">
              <h3 className="font-semibold text-heading-dark mb-3">🎯 Supported Question Types (12 types)</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-body-text">
                {QUESTION_TYPE_OPTIONS.map((qt) => (
                  <div key={qt.value} className="flex items-center">
                    <span className="mr-2 text-brand-800">•</span>
                    <span>{qt.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SurveyCreator;
