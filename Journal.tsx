import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Book, Calendar } from 'lucide-react';

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: string;
}

const Journal = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState({
    title: '',
    content: '',
    mood: 'neutral'
  });
  const [isWriting, setIsWriting] = useState(false);

  const handleSave = () => {
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      title: currentEntry.title,
      content: currentEntry.content,
      mood: currentEntry.mood
    };
    setEntries([newEntry, ...entries]);
    setCurrentEntry({ title: '', content: '', mood: 'neutral' });
    setIsWriting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Book className="h-6 w-6 mr-2" />
              My Journal
            </h1>
          </div>

          {!isWriting ? (
            <div>
              <button
                onClick={() => setIsWriting(true)}
                className="w-full bg-indigo-600 text-white rounded-lg py-3 mb-6 hover:bg-indigo-700 transition-colors flex items-center justify-center"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Write New Entry
              </button>

              <div className="space-y-4">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{entry.title}</h3>
                      <span className="text-sm text-gray-500">{entry.date}</span>
                    </div>
                    <p className="text-gray-600 line-clamp-3">{entry.content}</p>
                    <div className="mt-2 flex items-center">
                      <span className="text-sm text-gray-500">Mood: {entry.mood}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Entry Title"
                value={currentEntry.title}
                onChange={(e) => setCurrentEntry({ ...currentEntry, title: e.target.value })}
                className="w-full border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />

              <select
                value={currentEntry.mood}
                onChange={(e) => setCurrentEntry({ ...currentEntry, mood: e.target.value })}
                className="w-full border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="happy">Happy</option>
                <option value="calm">Calm</option>
                <option value="neutral">Neutral</option>
                <option value="anxious">Anxious</option>
                <option value="sad">Sad</option>
              </select>

              <textarea
                placeholder="Write your thoughts here..."
                value={currentEntry.content}
                onChange={(e) => setCurrentEntry({ ...currentEntry, content: e.target.value })}
                className="w-full h-64 border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsWriting(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Save className="h-5 w-5 mr-2" />
                  Save Entry
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Journal;