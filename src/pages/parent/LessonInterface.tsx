import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, CheckCircle2, Camera, PlayCircle, Quote, Sparkles } from 'lucide-react';

export default function LessonInterface({ onClose }) {
  // --- LESSON STATE ---
  const [currentStep, setCurrentStep] = useState(1);
  
  // --- FULL DAY 1 LESSON DATA ---
  const lessonData = {
    title: "Day 1: Hello, Butterfly!",
    targetWords: ["Butterfly", "Build", "Fly", "Happy", "Weather"],
    materials: "Geo Animal Puzzle (Butterfly pieces), Worksheet 1, a crayon, a tissue or light scarf, and The Butterfly Flashcard.",
    steps: [
      {
        id: 1,
        title: "Morning Circle",
        subtitle: "Sing, Move, & Connect",
        uiText: "Welcome to KinderRent! Let’s leave the stress behind and start with pure connection. Play the video, dance together, and check in with how your child is feeling today.",
        imageGradient: "from-blue-100 to-cyan-100",
        actions: [
          {
            instruction: "1. The KinderRent 'Hello' Dance: Press play on the video. Hold your child's hands and mirror the simple dance moves on the screen!",
            script: "Hello! Let's do what's in the video! Let's jump and spin together!",
            hasVideo: true
          },
          {
            instruction: "2. The Weather Window: Walk to the closest window together and look outside.",
            script: "What do you think it's like outside today? How is the Weather? Is it sunny or rainy?"
          },
          {
            instruction: "3. The Feelings Check-in: Sit face-to-face on the floor. Hold their hands or tickle them gently.",
            script: "How are you feeling today? I am so Happy to be with you right now!"
          }
        ]
      },
      {
        id: 2,
        title: "The Toy Builder",
        subtitle: "Time to be engineers!",
        uiText: "Open your KinderRent box and take out the puzzle pieces. Follow your child's lead and let them explore.",
        imageGradient: "from-purple-100 to-pink-100",
        actions: [
          {
            instruction: "Action: Place the specific pieces needed for the butterfly on the floor. Work together to build it. Hand the pieces to your child one by one.",
            script: "What do you think we can make with these pieces? Let's Build! Look, it's a Butterfly! Can you say Butterfly? Now let's make the Butterfly Fly! (Pick up the puzzle and make it swoop through the air)."
          }
        ]
      },
      {
        id: 3,
        title: "The Home Explorer Game",
        subtitle: "The Falling Butterfly",
        uiText: "Let's play a silly game! Grab a single tissue, a paper towel, or a light scarf.",
        imageGradient: "from-green-100 to-teal-100",
        actions: [
          {
            instruction: "Action: Stand up together. Scrunch the tissue up lightly, throw it high into the air, and watch it float down like a butterfly. Challenge them to catch it!",
            script: "Let's make this tissue a butterfly! Look, it can Fly! Fly, Fly, Fly! Can you catch the Butterfly before it hits the floor?"
          }
        ]
      },
      {
        id: 4,
        title: "Table Time Kickoff",
        subtitle: "Focus and calm down",
        uiText: "Great job! Now that we are focused, let's calm down and move to the table. Grab Worksheet 1 and a crayon.",
        imageGradient: "from-yellow-100 to-orange-100",
        actions: [
          {
            instruction: "Action: Present the worksheet. Sit right next to them as a team. Let them take their time.",
            script: "We built our own butterfly and made it fly! Now look at the paper. Here is another Butterfly. Can you Match it to its shadow? You draw the line!"
          }
        ]
      },
      {
        id: 5,
        title: "Flashcard Wind Down",
        subtitle: "& The AI High-Five",
        uiText: "We are almost done! Let's do a quiet review, celebrate their hard work, and log today's progress.",
        imageGradient: "from-pink-100 to-rose-100",
        actions: [
          {
            instruction: "Action 1 (The Flashcard Reveal): Pull out the Butterfly flashcard with the real photograph. Hold it next to the 3D toy they built.",
            script: "Look, this is our flashcard. It's a real Butterfly! See how much it looks like the one we built? You are so smart."
          },
          {
            instruction: "Action 2 (The AI Upload): Tell the child, 'Let's show the computer your amazing worksheet!' Snap a photo directly in the app to unlock Day 2.",
            isCamera: true
          },
          {
            instruction: "Action 3 (The Big Hug): Look your child in the eyes while the AI processes. High-five them.",
            script: "Playing with you was the best part of my day. Good job today! Bye-bye Butterfly!"
          }
        ]
      }
    ]
  };

  const totalSteps = lessonData.steps.length;

  // --- HANDLERS ---
  const nextStep = () => { if (currentStep < totalSteps) setCurrentStep(currentStep + 1); };
  const prevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };

  const activeStepData = lessonData.steps[currentStep - 1];

  return (
    <motion.div 
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-white z-50 flex flex-col font-sans"
    >
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between p-6 pb-2 border-b border-gray-100">
        <div>
          <span className="text-xs font-bold text-blue-500 uppercase tracking-wider flex items-center gap-1">
            <Sparkles size={12} /> Step-by-Step Guide
          </span>
          <h2 className="text-xl font-bold text-gray-900">{lessonData.title}</h2>
        </div>
        <button 
          onClick={onClose} 
          className="bg-gray-100 p-2 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* --- PROGRESS BAR --- */}
      <div className="px-6 py-4 flex gap-2">
        {lessonData.steps.map((step, index) => (
          <div 
            key={step.id} 
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              index + 1 <= currentStep ? 'bg-blue-600' : 'bg-gray-100'
            }`}
          />
        ))}
      </div>

      {/* --- LESSON CONTENT (Scrollable) --- */}
      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col">
        
        {/* Step 1 Overview: Target Words & Materials */}
        {currentStep === 1 && (
          <div className="mb-6 bg-blue-50/50 border border-blue-100 rounded-2xl p-4 text-sm">
            <div className="mb-3">
              <span className="font-bold text-blue-800 block mb-1">Target English Words:</span>
              <div className="flex flex-wrap gap-2">
                {lessonData.targetWords.map(word => (
                  <span key={word} className="bg-white px-2 py-1 rounded-md text-blue-600 font-medium border border-blue-100 shadow-sm">{word}</span>
                ))}
              </div>
            </div>
            <div>
              <span className="font-bold text-blue-800 block mb-1">Materials Needed:</span>
              <p className="text-blue-900 leading-relaxed">{lessonData.materials}</p>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{activeStepData.title}</h1>
            <h3 className="text-lg font-medium text-blue-600 mb-4">{activeStepData.subtitle}</h3>
            
            <div className="bg-gray-50 rounded-2xl p-4 mb-8 border border-gray-100">
              <p className="text-gray-600 text-[15px] leading-relaxed">
                {activeStepData.uiText}
              </p>
            </div>

            {/* Action Steps & Scripts */}
            <div className="space-y-6 mb-8">
              {activeStepData.actions.map((action, idx) => (
                <div key={idx} className="flex flex-col gap-3">
                  
                  {/* The Parent Instruction */}
                  <p className="text-gray-800 font-medium leading-relaxed">
                    {action.instruction}
                  </p>

                  {/* Video Placeholder (if needed) */}
                  {action.hasVideo && (
                    <div className="w-full aspect-video bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300 hover:bg-gray-200 transition-colors cursor-pointer my-2">
                      <PlayCircle size={48} className="text-blue-500" />
                    </div>
                  )}

                  {/* The exact Parent Script (Highlighted) */}
                  {action.script && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-r-2xl p-4 relative shadow-sm">
                      <Quote className="absolute top-3 right-3 text-blue-200" size={24} />
                      <p className="text-blue-900 text-lg font-medium italic leading-relaxed pr-6">
                        "{action.script}"
                      </p>
                    </div>
                  )}

                  {/* Camera Button for AI Upload */}
                  {action.isCamera && (
                    <button className="w-full bg-blue-50 border-2 border-dashed border-blue-300 text-blue-600 rounded-2xl py-8 flex flex-col items-center justify-center gap-3 hover:bg-blue-100 transition-colors my-2">
                      <div className="bg-blue-600 text-white p-4 rounded-full">
                        <Camera size={28} />
                      </div>
                      <span className="font-bold">Tap to snap a photo of the worksheet</span>
                    </button>
                  )}
                  
                </div>
              ))}
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- BOTTOM ACTION BAR --- */}
      <div className="p-6 bg-white border-t border-gray-100 pb-safe">
        <div className="flex gap-4">
          
          <button 
            onClick={prevStep}
            className={`p-4 rounded-2xl border-2 border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors ${currentStep === 1 ? 'invisible w-0 p-0 border-0' : 'w-16 flex items-center justify-center'}`}
          >
            <ChevronLeft size={24} />
          </button>

          {currentStep < totalSteps ? (
             <button 
               onClick={nextStep}
               className="flex-1 bg-blue-600 text-white font-bold text-lg py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all"
             >
               Next Step <ChevronRight size={20} />
             </button>
          ) : (
             <button 
               onClick={onClose}
               className="flex-1 bg-green-500 text-white font-bold text-lg py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-green-200 hover:bg-green-600 active:scale-95 transition-all"
             >
               <CheckCircle2 size={24} /> Finish Lesson!
             </button>
          )}

        </div>
      </div>
    </motion.div>
  );
}