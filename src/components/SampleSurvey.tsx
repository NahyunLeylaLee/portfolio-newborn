/**
 * Survey Answer Demo - Standalone Version
 * 
 * A completely independent demo page for answering surveys
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

interface Answer {
  questionId: string | number;
  optionId?: number;
  answerText?: string;
  selectedOptionIds?: number[]; // For checkboxes
  matrixAnswers?: { rowId: number; colId: number }[]; // For grids
}

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
// ANSWER COMPONENTS
// ============================================================================

interface AnswerComponentProps {
  question: IQuestion;
  options: IOption[];
  answer?: Answer;
  onAnswerChange: (answer: Answer) => void;
}

const AnswerComponent: React.FC<AnswerComponentProps> = ({
  question,
  options,
  answer,
  onAnswerChange,
}) => {
  const type = question.type;
  const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  // Short Answer
  if (type === QuestionType.SHORT_ANSWER) {
    return (
      <div className="mt-4">
        <input
          type="text"
          className="border-b-2 border-brand-300 focus:border-brand-800 outline-none w-full md:w-2/3 p-2"
          placeholder="Your answer"
          value={answer?.answerText || ''}
          onChange={(e) =>
            onAnswerChange({
              questionId: question.id,
              answerText: e.target.value,
            })
          }
        />
      </div>
    );
  }

  // Long Answer
  if (type === QuestionType.LONG_ANSWER) {
    return (
      <div className="mt-4">
        <textarea
          className="border-2 border-brand-300 focus:border-brand-800 outline-none w-full p-3 rounded-lg resize-none"
          placeholder="Your answer"
          rows={4}
          value={answer?.answerText || ''}
          onChange={(e) =>
            onAnswerChange({
              questionId: question.id,
              answerText: e.target.value,
            })
          }
        />
      </div>
    );
  }

  // Multiple Choice
  if (type === QuestionType.MULTIPLE_CHOICE) {
    return (
      <div className="mt-4 space-y-2">
        {options.map((option) => (
          <label key={option.order} className="flex items-center cursor-pointer hover:bg-brand-50 p-2 rounded-lg">
            <input
              type="radio"
              name={`question-${question.id}`}
              className="w-5 h-5 mr-3 accent-brand-800"
              checked={answer?.optionId === option.order}
              onChange={() =>
                onAnswerChange({
                  questionId: question.id,
                  optionId: option.order,
                  answerText: option.title,
                })
              }
            />
            <span className="text-body-text">{option.title || `Option ${option.order}`}</span>
            {option.order === 999 && answer?.optionId === 999 && (
              <input
                type="text"
                className="ml-3 border-b border-brand-300 flex-1 outline-none px-2 py-1"
                placeholder="Please specify"
                value={answer?.answerText || ''}
                onChange={(e) =>
                  onAnswerChange({
                    questionId: question.id,
                    optionId: 999,
                    answerText: e.target.value,
                  })
                }
              />
            )}
          </label>
        ))}
      </div>
    );
  }

  // Checkboxes
  if (type === QuestionType.CHECKBOXES) {
    const selectedIds = answer?.selectedOptionIds || [];

    return (
      <div className="mt-4 space-y-2">
        {options.map((option) => (
          <label key={option.order} className="flex items-center cursor-pointer hover:bg-brand-50 p-2 rounded-lg">
            <input
              type="checkbox"
              className="w-5 h-5 mr-3 accent-brand-800"
              checked={selectedIds.includes(option.order)}
              onChange={(e) => {
                const newSelectedIds = e.target.checked
                  ? [...selectedIds, option.order]
                  : selectedIds.filter((id) => id !== option.order);
                onAnswerChange({
                  questionId: question.id,
                  selectedOptionIds: newSelectedIds,
                });
              }}
            />
            <span className="text-body-text">{option.title || `Option ${option.order}`}</span>
          </label>
        ))}
      </div>
    );
  }

  // Dropdown
  if (type === QuestionType.DROP_DOWN) {
    return (
      <div className="mt-4">
        <select
          className="border-2 border-brand-300 rounded-lg p-3 w-full md:w-2/3 outline-none focus:border-brand-800"
          value={answer?.optionId || ''}
          onChange={(e) => {
            const optionId = Number(e.target.value);
            const option = options.find((o) => o.order === optionId);
            onAnswerChange({
              questionId: question.id,
              optionId,
              answerText: option?.title,
            });
          }}
        >
          <option value="">Choose</option>
          {options.map((option) => (
            <option key={option.order} value={option.order}>
              {option.title || `Option ${option.order}`}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // Linear Scale
  if (type === QuestionType.LINEAR_SCALE) {
    const numbers = options.map((o) => Number(o.title)).filter((n) => !isNaN(n));
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);

    return (
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-body-text">{question.minLabel || min}</span>
          <span className="text-sm text-body-text">{question.maxLabel || max}</span>
        </div>
        <div className="flex gap-4 justify-center">
          {options.map((option) => (
            <label
              key={option.order}
              className="flex flex-col items-center cursor-pointer"
            >
              <span className="text-sm mb-2 text-body-text">{option.title}</span>
              <input
                type="radio"
                name={`question-${question.id}`}
                className="w-5 h-5 accent-brand-800"
                checked={answer?.optionId === option.order}
                onChange={() =>
                  onAnswerChange({
                    questionId: question.id,
                    optionId: option.order,
                    answerText: option.title,
                  })
                }
              />
            </label>
          ))}
        </div>
      </div>
    );
  }

  // Radio Grid
  if (type === QuestionType.RADIO_GRID) {
    const rows = options.filter((o) => o.isRow);
    const cols = options.filter((o) => !o.isRow);
    const matrixAnswers = answer?.matrixAnswers || [];

    return (
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-brand-300 p-2"></th>
              {cols.map((col) => (
                <th key={col.order} className="border border-brand-300 p-2 text-sm font-normal text-body-text">
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.order}>
                <td className="border border-brand-300 p-2 text-sm text-body-text">{row.title}</td>
                {cols.map((col) => (
                  <td key={col.order} className="border border-brand-300 p-2 text-center">
                    <input
                      type="radio"
                      name={`question-${question.id}-row-${row.order}`}
                      className="w-5 h-5 cursor-pointer accent-brand-800"
                      checked={matrixAnswers.some(
                        (a) => a.rowId === row.order && a.colId === col.order
                      )}
                      onChange={() => {
                        const newAnswers = matrixAnswers.filter(
                          (a) => a.rowId !== row.order
                        );
                        newAnswers.push({ rowId: row.order, colId: col.order });
                        onAnswerChange({
                          questionId: question.id,
                          matrixAnswers: newAnswers,
                        });
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Checkbox Grid
  if (type === QuestionType.CHECKBOX_GRID) {
    const rows = options.filter((o) => o.isRow);
    const cols = options.filter((o) => !o.isRow);
    const matrixAnswers = answer?.matrixAnswers || [];

    return (
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-brand-300 p-2"></th>
              {cols.map((col) => (
                <th key={col.order} className="border border-brand-300 p-2 text-sm font-normal text-body-text">
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.order}>
                <td className="border border-brand-300 p-2 text-sm text-body-text">{row.title}</td>
                {cols.map((col) => (
                  <td key={col.order} className="border border-brand-300 p-2 text-center">
                    <input
                      type="checkbox"
                      className="w-5 h-5 cursor-pointer accent-brand-800"
                      checked={matrixAnswers.some(
                        (a) => a.rowId === row.order && a.colId === col.order
                      )}
                      onChange={(e) => {
                        let newAnswers = [...matrixAnswers];
                        if (e.target.checked) {
                          newAnswers.push({ rowId: row.order, colId: col.order });
                        } else {
                          newAnswers = newAnswers.filter(
                            (a) => !(a.rowId === row.order && a.colId === col.order)
                          );
                        }
                        onAnswerChange({
                          questionId: question.id,
                          matrixAnswers: newAnswers,
                        });
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Date Answer
  if (type === QuestionType.DATE_ANSWER) {
    return (
      <div className="mt-4">
        <input
          type="date"
          className="border-2 border-brand-300 rounded-lg p-3 outline-none focus:border-brand-800"
          value={answer?.answerText || ''}
          onChange={(e) =>
            onAnswerChange({
              questionId: question.id,
              answerText: e.target.value,
            })
          }
        />
      </div>
    );
  }

  // Time Answer
  if (type === QuestionType.TIME_ANSWER) {
    return (
      <div className="mt-4">
        <input
          type="time"
          className="border-2 border-brand-300 rounded-lg p-3 outline-none focus:border-brand-800"
          value={answer?.answerText || ''}
          onChange={(e) =>
            onAnswerChange({
              questionId: question.id,
              answerText: e.target.value,
            })
          }
        />
      </div>
    );
  }

  // File Upload
  if (type === QuestionType.FILE_UPLOAD) {
    return (
      <div className="mt-4">
        <label className="inline-block border-2 border-brand-800 text-brand-800 rounded-lg px-6 py-3 cursor-pointer hover:bg-brand-50">
          📎 Add file
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                onAnswerChange({
                  questionId: question.id,
                  answerText: file.name,
                });
              }
            }}
          />
        </label>
        {answer?.answerText && (
          <div className="mt-2 text-sm text-body-text">Selected: {answer.answerText}</div>
        )}
      </div>
    );
  }

  // Address Answer
  if (type === QuestionType.ADDRESS_ANSWER) {
    const searchAddress = async (query: string) => {
      if (!query || query.trim().length < 1) {
        setAddressSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setIsSearching(true);
      setShowSuggestions(true);

      try {
        // Using Nominatim API (OpenStreetMap) - Free and no API key required
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&countrycodes=ca&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`,
          {
            headers: {
              'User-Agent': 'NewbornTrack Demo App'
            }
          }
        );
        const data = await response.json();
        
        // Format addresses to show only City, Province, Country
        const formattedData = data.map((item: any) => {
          const addr = item.address;
          const city = addr?.city || addr?.town || addr?.village || addr?.municipality;
          const province = addr?.state || addr?.province;
          const country = addr?.country;
          
          const parts = [];
          if (city) parts.push(city);
          if (province) parts.push(province);
          if (country) parts.push(country);
          
          return {
            ...item,
            formatted_address: parts.join(', ') || item.display_name
          };
        });
        
        setAddressSuggestions(formattedData);
      } catch (error) {
        console.error('Error searching address:', error);
        setAddressSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    };

    const handleAddressChange = (value: string) => {
      onAnswerChange({
        questionId: question.id,
        answerText: value,
      });

      // Clear previous timeout
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }

      // Set new timeout for debounced search
      if (value.trim().length >= 1) {
        const timeout = setTimeout(() => {
          searchAddress(value);
        }, 500); // Wait 500ms after user stops typing
        setSearchTimeout(timeout);
      } else {
        setAddressSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const selectAddress = (suggestion: any) => {
      onAnswerChange({
        questionId: question.id,
        answerText: suggestion.formatted_address || suggestion.display_name,
      });
      setShowSuggestions(false);
      setAddressSuggestions([]);
    };

    const clearAddress = () => {
      onAnswerChange({
        questionId: question.id,
        answerText: '',
      });
      setShowSuggestions(false);
      setAddressSuggestions([]);
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };

    return (
      <div className="mt-4 space-y-2 relative">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              className="border-2 border-brand-300 rounded-lg p-3 w-full pr-10 outline-none focus:border-brand-800"
              placeholder="e.g., Toronto, Vancouver, Montreal"
              value={answer?.answerText || ''}
              onChange={(e) => handleAddressChange(e.target.value)}
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <span className="text-brand-800">⏳</span>
              </div>
            )}
            {!isSearching && answer?.answerText && (
              <button
                onClick={clearAddress}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
          <button 
            onClick={() => searchAddress(answer?.answerText || '')}
            disabled={isSearching || !answer?.answerText || answer.answerText.trim().length < 1}
            className="border-2 border-brand-800 text-brand-800 rounded-lg px-6 py-3 hover:bg-brand-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            📍 Find
          </button>
        </div>
        
        {/* Helper Text */}
        <div className="text-xs text-body-text">
          💡 Search for cities in Canada (e.g., Toronto, Vancouver, Montreal)
        </div>
        
        {/* Address Suggestions Dropdown */}
        {showSuggestions && addressSuggestions.length > 0 && (
          <div className="absolute z-10 w-full bg-white border-2 border-brand-300 rounded-lg shadow-xl max-h-60 overflow-y-auto mt-1">
            {addressSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => selectAddress(suggestion)}
                className="w-full text-left p-3 hover:bg-brand-50 border-b border-brand-200 last:border-b-0 transition-colors"
              >
                <div className="text-sm text-heading-dark">{suggestion.formatted_address}</div>
              </button>
            ))}
          </div>
        )}
        
        {showSuggestions && addressSuggestions.length === 0 && !isSearching && answer?.answerText && answer.answerText.trim().length >= 1 && (
          <div className="text-sm text-body-text">No cities found. Try a different search.</div>
        )}
      </div>
    );
  }

  return null;
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const SampleSurvey: React.FC = () => {
  const navigate = useNavigate();
  const [survey, setSurvey] = useState<ISurvey | null>(null);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [options, setOptions] = useState<IOption[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  const handleBackToMain = () => {
    navigate('/');
  };

  const handleAnswerChange = (newAnswer: Answer) => {
    setAnswers((prev) => {
      const existing = prev.findIndex((a) => a.questionId === newAnswer.questionId);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = newAnswer;
        return updated;
      }
      return [...prev, newAnswer];
    });
  };

  const getAnswer = (questionId: string | number): Answer | undefined => {
    return answers.find((a) => a.questionId === questionId);
  };

  const loadTemplate = (templateType: string) => {
    setSelectedTemplate(templateType);
    setIsInitialized(true);
    setAnswers([]);

    let newSurvey: ISurvey;
    let newQuestions: IQuestion[] = [];
    let newOptions: IOption[] = [];

    switch (templateType) {
      case 'basic':
        newSurvey = {
          id: 'demo-survey',
          title: 'Basic Survey',
          description: 'A simple survey with basic questions',
          order: 1,
          isMain: true,
          isBasic: false,
          startSending: false,
          nextSectionId: 'submit',
          age: 0,
          term: 0,
        };

        newQuestions = [
          {
            id: 'q-1',
            surveyId: 'demo-survey',
            type: QuestionType.SHORT_ANSWER,
            title: 'What is your name?',
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
            title: 'What is your gender?',
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
            title: 'Any additional comments?',
            order: 3,
            isRequired: false,
            basedOnAnswer: false,
            minLabel: '',
            maxLabel: '',
          },
        ];

        newOptions = [
          { surveyId: 'demo-survey', questionId: 'q-2', order: 1, title: 'Male', isRow: true },
          { surveyId: 'demo-survey', questionId: 'q-2', order: 2, title: 'Female', isRow: true },
        ];
        break;

      case 'satisfaction':
        newSurvey = {
          id: 'demo-survey',
          title: 'Satisfaction Survey',
          description: 'Help us improve our service',
          order: 1,
          isMain: true,
          isBasic: false,
          startSending: false,
          nextSectionId: 'submit',
          age: 0,
          term: 0,
        };

        newQuestions = [
          {
            id: 'q-1',
            surveyId: 'demo-survey',
            type: QuestionType.LINEAR_SCALE,
            title: 'How satisfied are you overall?',
            order: 1,
            isRequired: true,
            basedOnAnswer: false,
            minLabel: 'Very Dissatisfied',
            maxLabel: 'Very Satisfied',
          },
          {
            id: 'q-2',
            surveyId: 'demo-survey',
            type: QuestionType.CHECKBOXES,
            title: 'What did you like? (Select all that apply)',
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
            title: 'How can we improve?',
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
          { surveyId: 'demo-survey', questionId: 'q-2', order: 1, title: 'Quality', isRow: true },
          { surveyId: 'demo-survey', questionId: 'q-2', order: 2, title: 'Service', isRow: true },
          { surveyId: 'demo-survey', questionId: 'q-2', order: 3, title: 'Price', isRow: true },
        ];
        break;

      case 'allTypes':
        newSurvey = {
          id: 'demo-survey',
          title: 'All Question Types Demo',
          description: 'Experience answering all 12 question types',
          order: 1,
          isMain: true,
          isBasic: false,
          startSending: false,
          nextSectionId: 'submit',
          age: 0,
          term: 0,
        };

        let qOrder = 1;
        QUESTION_TYPE_OPTIONS.forEach((qtOpt) => {
          const q: IQuestion = {
            id: `q-${qOrder}`,
            surveyId: 'demo-survey',
            type: qtOpt.value,
            title: `${qtOpt.label} Example`,
            order: qOrder,
            isRequired: false,
            basedOnAnswer: false,
            minLabel: qtOpt.value === QuestionType.LINEAR_SCALE ? 'Minimum' : '',
            maxLabel: qtOpt.value === QuestionType.LINEAR_SCALE ? 'Maximum' : '',
          };
          newQuestions.push(q);

          if ([QuestionType.MULTIPLE_CHOICE, QuestionType.CHECKBOXES, QuestionType.DROP_DOWN].includes(qtOpt.value)) {
            newOptions.push(
              { surveyId: 'demo-survey', questionId: q.id, order: 1, title: 'Option 1', isRow: true },
              { surveyId: 'demo-survey', questionId: q.id, order: 2, title: 'Option 2', isRow: true },
              { surveyId: 'demo-survey', questionId: q.id, order: 3, title: 'Option 3', isRow: true }
            );
          } else if (qtOpt.value === QuestionType.LINEAR_SCALE) {
            for (let i = 1; i <= 5; i++) {
              newOptions.push({ surveyId: 'demo-survey', questionId: q.id, order: i, title: String(i), isRow: true });
            }
          } else if ([QuestionType.RADIO_GRID, QuestionType.CHECKBOX_GRID].includes(qtOpt.value)) {
            newOptions.push(
              { surveyId: 'demo-survey', questionId: q.id, order: 1, title: 'Row 1', isRow: true },
              { surveyId: 'demo-survey', questionId: q.id, order: 2, title: 'Row 2', isRow: true },
              { surveyId: 'demo-survey', questionId: q.id, order: 101, title: 'Column 1', isRow: false },
              { surveyId: 'demo-survey', questionId: q.id, order: 102, title: 'Column 2', isRow: false }
            );
          }

          qOrder++;
        });
        break;

      default:
        return;
    }

    setSurvey(newSurvey);
    setQuestions(newQuestions);
    setOptions(newOptions);
  };

  const handleSubmit = () => {
    // Check required questions
    const unansweredRequired = questions
      .filter((q) => q.isRequired)
      .filter((q) => !answers.some((a) => a.questionId === q.id && (a.answerText || a.optionId || a.selectedOptionIds?.length)));

    if (unansweredRequired.length > 0) {
      alert(`Please answer all required questions (${unansweredRequired.length} remaining)`);
      return;
    }

    alert('Survey submitted successfully!');

    // Return to template selection
    setIsInitialized(false);
    setAnswers([]);
  };

  const calculateProgress = () => {
    const totalRequired = questions.filter((q) => q.isRequired).length;
    const answeredRequired = questions
      .filter((q) => q.isRequired)
      .filter((q) => answers.some((a) => a.questionId === q.id && (a.answerText || a.optionId || a.selectedOptionIds?.length)))
      .length;

    return totalRequired > 0 ? (answeredRequired / totalRequired) * 100 : 100;
  };

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
          <h1 className="text-4xl font-bold text-heading-dark mb-3">📝 Survey Answer Demo</h1>
          <p className="text-body-text">Experience answering different types of survey questions</p>
        </div>

        {/* Template Selection */}
        {!isInitialized && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-brand-200">
            <h2 className="text-2xl font-semibold text-heading-dark mb-4">Choose a Survey</h2>
            <p className="text-body-text mb-6">Select a survey template to start answering</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => loadTemplate('basic')}
                className="p-5 border-2 border-brand-600 rounded-xl hover:bg-brand-50 hover:border-brand-800 transition-all text-left"
              >
                <div className="font-semibold text-brand-800 text-lg mb-2">📝 Basic Survey</div>
                <div className="text-sm text-body-text">3 simple questions</div>
              </button>

              <button
                onClick={() => loadTemplate('satisfaction')}
                className="p-5 border-2 border-brand-600 rounded-xl hover:bg-brand-50 hover:border-brand-800 transition-all text-left"
              >
                <div className="font-semibold text-brand-800 text-lg mb-2">⭐ Satisfaction Survey</div>
                <div className="text-sm text-body-text">Rate our service</div>
              </button>

              <button
                onClick={() => loadTemplate('allTypes')}
                className="p-5 border-2 border-brand-600 rounded-xl hover:bg-brand-50 hover:border-brand-800 transition-all text-left md:col-span-2"
              >
                <div className="font-semibold text-brand-800 text-lg mb-2">🎨 All Question Types</div>
                <div className="text-sm text-body-text">Experience all 12 question types</div>
              </button>
            </div>
          </div>
        )}

        {/* Survey */}
        {isInitialized && survey && (
          <>
            {/* Back Button */}
            <div className="mb-6 flex justify-between items-center">
              <button
                onClick={() => setIsInitialized(false)}
                className="px-4 py-2 bg-brand-800 text-white rounded-full hover:bg-brand-900 transition-colors shadow-md"
              >
                ← Choose Another Survey
              </button>
            </div>

            {/* Progress Bar */}
            {questions.some((q) => q.isRequired) && (
              <div className="mb-6 bg-white rounded-2xl p-4 shadow-lg border border-brand-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-body-text">Progress</span>
                  <span className="text-sm font-semibold text-heading-dark">{Math.round(calculateProgress())}%</span>
                </div>
                <div className="w-full bg-brand-200 rounded-full h-2">
                  <div
                    className="bg-brand-800 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${calculateProgress()}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Survey Header */}
            <div className="bg-white border-t-8 border-brand-800 rounded-2xl p-8 mb-6 shadow-lg">
              <h2 className="text-3xl font-bold text-heading-dark mb-3">{survey.title}</h2>
              <p className="text-body-text">{survey.description}</p>
              {questions.some((q) => q.isRequired) && (
                <p className="text-sm text-red-600 mt-3">* Required</p>
              )}
            </div>

            {/* Questions */}
            {questions
              .sort((a, b) => a.order - b.order)
              .map((question) => (
                <div key={question.id} className="bg-white rounded-2xl p-6 mb-4 shadow-lg border border-brand-200">
                  <div className="flex items-start gap-2">
                    <h3 className="text-lg font-medium text-heading-dark flex-1">
                      {question.title}
                      {question.isRequired && <span className="text-red-600 ml-1">*</span>}
                    </h3>
                  </div>

                  <AnswerComponent
                    question={question}
                    options={options.filter((o) => o.questionId === question.id)}
                    answer={getAnswer(question.id)}
                    onAnswerChange={handleAnswerChange}
                  />
                </div>
              ))}

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-brand-800 text-white py-4 rounded-full font-semibold hover:bg-brand-900 transition-colors shadow-lg"
              >
                Submit Survey
              </button>
              <button
                onClick={() => {
                  setAnswers([]);
                  alert('All answers cleared!');
                }}
                className="px-6 bg-brand-300 text-heading-dark py-4 rounded-full font-semibold hover:bg-brand-400 transition-colors"
              >
                Clear All
              </button>
            </div>

            {/* Footer Info */}
            <div className="mt-8 p-6 bg-white rounded-2xl border border-brand-200 shadow-lg">
              <h3 className="font-semibold text-heading-dark mb-3">💡 Demo Features</h3>
              <ul className="text-sm text-body-text space-y-1 list-disc ml-5">
                <li>Answer validation for required fields</li>
                <li>Progress tracking for required questions</li>
                <li>Clear all answers option</li>
                <li>Submit survey to complete</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SampleSurvey;
