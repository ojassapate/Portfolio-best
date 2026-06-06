import { useState, useCallback, useEffect } from 'react';

export function useEditMode(initialData) {
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('idle'); // 'idle' | 'saving' | 'saved' | 'error'

  // Fetch persisted data from API on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/portfolio');
        if (res.ok) {
          const json = await res.json();
          if (json.data) {
            setData(json.data);
          }
          // If json.data is null, keep the hardcoded defaults
        }
      } catch (err) {
        console.warn('Could not fetch portfolio data from API, using defaults:', err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const updateField = useCallback((path, value) => {
    setData(prev => {
      const parts = path.split('.');
      const next = JSON.parse(JSON.stringify(prev));
      let obj = next;
      for (let i = 0; i < parts.length - 1; i++) obj = obj[parts[i]];
      obj[parts[parts.length - 1]] = value;
      return next;
    });
  }, []);

  const updateNestedArray = useCallback((arrayPath, index, field, value) => {
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const parts = arrayPath.split('.');
      let obj = next;
      for (const p of parts) obj = obj[p];
      obj[index][field] = value;
      return next;
    });
  }, []);

  const addItem = useCallback((arrayPath, template) => {
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const parts = arrayPath.split('.');
      let obj = next;
      for (const p of parts) obj = obj[p];
      obj.push(typeof template === 'function' ? template(obj.length) : { ...template, id: `item_${Date.now()}` });
      return next;
    });
  }, []);

  const removeItem = useCallback((arrayPath, index) => {
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const parts = arrayPath.split('.');
      let obj = next;
      for (const p of parts) obj = obj[p];
      obj.splice(index, 1);
      return next;
    });
  }, []);

  // Save current data to the API
  const saveData = useCallback(async (password) => {
    setSaveStatus('saving');
    try {
      const res = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, data }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Save failed');
      }

      setSaveStatus('saved');
      // Reset status after 3 seconds
      setTimeout(() => setSaveStatus('idle'), 3000);
      return true;
    } catch (err) {
      console.error('Failed to save portfolio data:', err);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 4000);
      return false;
    }
  }, [data]);

  // Verify password with the backend
  const verifyPassword = useCallback(async (password) => {
    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        return true;
      }
      return false;
    } catch (err) {
      console.error('Failed to verify password:', err);
      return false;
    }
  }, []);

  const toggleEditMode = useCallback(() => setEditMode(v => !v), []);

  return {
    editMode, toggleEditMode,
    data, updateField, updateNestedArray, addItem, removeItem, setData,
    loading, saveStatus, saveData, verifyPassword,
  };
}
