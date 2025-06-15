import React from 'react';

export default function PitchDeckTab({ pitchDeck }) {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">AI-Generated Pitch Deck Outline</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {pitchDeck.map((slide, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center mb-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                  Slide {slide.slide}
                </span>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">{slide.title}</h4>
              <p className="text-sm text-gray-600">{slide.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
