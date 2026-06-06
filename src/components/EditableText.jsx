export function EditableText({ value, onChange, editMode, tag: Tag = 'span', className = '', multiline = false, placeholder = 'Click to edit...' }) {
  if (!editMode) {
    return <Tag className={className}>{value}</Tag>;
  }

  if (multiline) {
    return (
      <textarea
        className={className}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          background: 'rgba(255,172,64,0.08)',
          border: '2px solid rgba(255,172,64,0.5)',
          color: 'var(--text)',
          padding: '8px',
          width: '100%',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          lineHeight: 'inherit',
          resize: 'vertical',
          minHeight: '80px',
          outline: 'none',
        }}
      />
    );
  }

  return (
    <input
      type="text"
      className={className}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        background: 'rgba(255,172,64,0.08)',
        border: '2px solid rgba(255,172,64,0.5)',
        color: 'var(--text)',
        padding: '4px 8px',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        width: '100%',
        outline: 'none',
      }}
    />
  );
}
