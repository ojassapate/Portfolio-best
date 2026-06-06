import { useState, useCallback } from 'react';

export function useEditMode(initialData) {
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState(initialData);

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

  const toggleEditMode = useCallback(() => setEditMode(v => !v), []);

  return { editMode, toggleEditMode, data, updateField, updateNestedArray, addItem, removeItem, setData };
}
