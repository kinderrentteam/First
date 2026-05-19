import React, { useState } from 'react';
import { Settings, Edit3, Save, Plus, Trash2, Image as ImageIcon, GripVertical, Link } from 'lucide-react';

export default function AssessmentEditor() {
  const [editingId, setEditingId] = useState(null);
  const [draftQuestion, setDraftQuestion] = useState(null); // Holds the changes before saving

  // Mock database
  const [questions, setQuestions] = useState([
    {
      id: 'q1',
      title: 'Playing & Thinking',
      subtitle: 'How do they play with a new puzzle or toy?',
      heroImage: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=400&q=80', 
      options: [
        { text: 'Touches, shakes, or tests the pieces.', icon: '🏗️' },
        { text: 'Tries different pieces until one fits.', icon: '🧩' },
        { text: 'Looks and puts it in the right place directly.', icon: '💡' }
      ]
    },
    {
      id: 'q2',
      title: 'Holding a Pen',
      subtitle: 'How do they hold a crayon or pencil?',
      heroImage: '', 
      options: [
        { text: 'Whole Hand (Fist)', icon: '✊' },
        { text: 'All Fingers', icon: '🖐️' },
        { text: 'Two Fingers (Pincer)', icon: '🤏' }
      ]
    }
  ]);

  // --- WIRING FUNCTIONS ---

  const startEditing = (question) => {
    setEditingId(question.id);
    // Create a deep copy of the question so we don't accidentally edit the live database until we hit "Save"
    setDraftQuestion(JSON.parse(JSON.stringify(question)));
  };

  const handleDraftChange = (field, value) => {
    setDraftQuestion(prev => ({ ...prev, [field]: value }));
  };

  const updateOption = (index, field, value) => {
    const newOptions = [...draftQuestion.options];
    newOptions[index][field] = value;
    setDraftQuestion(prev => ({ ...prev, options: newOptions }));
  };

  const addOption = () => {
    setDraftQuestion(prev => ({
      ...prev,
      options: [...prev.options, { text: 'New Option', icon: '❓' }]
    }));
  };

  const removeOption = (indexToRemove) => {
    setDraftQuestion(prev => ({
      ...prev,
      options: prev.options.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSave = () => {
    // Overwrite the old question with our new draft
    setQuestions(questions.map(q => q.id === editingId ? draftQuestion : q));
    setEditingId(null);
    setDraftQuestion(null);
    alert('Assessment updated successfully!');
  };

  const handleCancel = () => {
    setEditingId(null);
    setDraftQuestion(null);
  };

  return (
    <div className="max-w-6xl mx-auto font-sans pb-24">
      
      <header className="mb-8 flex justify-between items-end">
        <div>
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-bold mb-3 border border-purple-100">
            <Settings size={14} /> Algorithm Settings
          </div>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">Assessment Engine</h1>
          <p className="text-gray-500 text-sm mt-1">Edit the onboarding quiz questions, layout, and CloudPanel image assets.</p>
        </div>
        <button className="bg-gray-900 text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-black flex items-center gap-2 shadow-lg shadow-gray-200 transition-all">
          <Plus size={18} /> Add New Question
        </button>
      </header>

      <div className="space-y-6">
        {questions.map((q, index) => (
          <div key={q.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden group">
            
            <div className="p-6 flex items-start gap-4 bg-gray-50/50">
              <div className="mt-1 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600">
                <GripVertical size={20} />
              </div>
              
              <div className="flex-1">
                {editingId === q.id && draftQuestion ? (
                  <div className="space-y-6 bg-white p-6 rounded-xl border border-blue-200 shadow-sm">
                    
                    {/* --- TEXT SETTINGS --- */}
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Question Title</label>
                        <input 
                          type="text" 
                          value={draftQuestion.title} 
                          onChange={(e) => handleDraftChange('title', e.target.value)}
                          className="w-full font-bold text-lg border-b-2 border-gray-200 focus:border-blue-600 outline-none pb-2 mt-1" 
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Subtitle / Instruction</label>
                        <input 
                          type="text" 
                          value={draftQuestion.subtitle} 
                          onChange={(e) => handleDraftChange('subtitle', e.target.value)}
                          className="w-full text-gray-600 border-b-2 border-gray-200 focus:border-blue-600 outline-none pb-2 mt-1" 
                        />
                      </div>
                    </div>

                    {/* --- CLOUDPANEL IMAGE INTEGRATION --- */}
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                      <label className="text-xs font-bold text-blue-800 uppercase tracking-widest flex items-center gap-2">
                        <ImageIcon size={14} /> Top Hero Image (CloudPanel URL)
                      </label>
                      <p className="text-[10px] text-blue-600 mb-3 mt-1">Paste the direct link to the image hosted on your CloudPanel server.</p>
                      
                      <div className="flex gap-4 items-center">
                        <div className="w-16 h-16 rounded-xl bg-white border border-blue-200 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                          {draftQuestion.heroImage ? (
                            <img src={draftQuestion.heroImage} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon size={24} className="text-gray-300" />
                          )}
                        </div>
                        <div className="flex-1 relative">
                          <Link size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input 
                            type="text" 
                            value={draftQuestion.heroImage} 
                            onChange={(e) => handleDraftChange('heroImage', e.target.value)}
                            placeholder="https://yourdomain.com/images/q1-header.jpg" 
                            className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:border-blue-500 outline-none shadow-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* --- VISUAL OPTIONS (NOW FULLY FUNCTIONAL) --- */}
                    <div className="pt-2 space-y-3">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Answer Options</label>
                      
                      {draftQuestion.options.map((opt, i) => (
                        <div key={i} className="flex gap-3 items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                           <input 
                             type="text" 
                             value={opt.icon} 
                             onChange={(e) => updateOption(i, 'icon', e.target.value)}
                             className="w-12 h-12 bg-white border border-gray-200 rounded-lg text-center text-xl focus:border-blue-500 outline-none" 
                           />
                           <input 
                             type="text" 
                             value={opt.text} 
                             onChange={(e) => updateOption(i, 'text', e.target.value)}
                             className="flex-1 bg-white border border-gray-200 rounded-md px-3 py-2 text-sm focus:border-blue-500 outline-none" 
                           />
                           <button 
                             onClick={() => removeOption(i)} 
                             className="text-red-400 hover:text-red-600 p-2"
                             title="Delete Option"
                           >
                             <Trash2 size={16} />
                           </button>
                        </div>
                      ))}
                      
                      <button 
                        onClick={addOption} 
                        className="text-sm font-bold text-blue-600 flex items-center gap-1 mt-2 hover:underline"
                      >
                        <Plus size={16}/> Add Option
                      </button>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                      <button onClick={handleCancel} className="px-4 py-2 text-gray-500 font-bold hover:bg-gray-50 rounded-lg">Cancel</button>
                      <button onClick={handleSave} className="bg-blue-600 text-white font-bold px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 shadow-md"><Save size={16}/> Save to App</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-gray-900 mb-1 flex justify-between items-center">
                      <span><span className="text-gray-400 mr-2">{index + 1}.</span>{q.title}</span>
                      {q.heroImage && <span className="bg-green-100 text-green-700 text-[10px] px-2 py-1 rounded-full uppercase tracking-wider flex items-center gap-1"><ImageIcon size={10}/> Image Linked</span>}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">{q.subtitle}</p>
                    
                    <div className="flex flex-wrap gap-3">
                      {q.options.map((opt, i) => (
                        <div key={i} className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 flex items-center gap-2 shadow-sm">
                          <span className="text-lg">{opt.icon}</span> {opt.text}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {editingId !== q.id && (
                <button 
                  onClick={() => startEditing(q)} 
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Edit3 size={20} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}