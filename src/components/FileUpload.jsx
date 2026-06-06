import { useState, useRef } from 'react';

const ACCEPTED = {
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'video/mp4': ['.mp4'],
  'video/webm': ['.webm'],
  'video/quicktime': ['.mov'],
  'model/stl': ['.stl'],
  'application/octet-stream': ['.stl', '.dwg', '.dxf'],
  'application/dxf': ['.dxf'],
  'application/dwg': ['.dwg'],
};

const ACCEPT_STRING = '.png,.jpg,.jpeg,.mp4,.webm,.mov,.stl,.dwg,.dxf';

function getFileIcon(file) {
  if (file.type?.startsWith('image/')) return '🖼';
  if (file.type?.startsWith('video/')) return '🎬';
  const ext = file.name?.split('.').pop()?.toLowerCase();
  if (ext === 'stl') return '🔩';
  if (ext === 'dwg' || ext === 'dxf') return '📐';
  return '📄';
}

export function FileUpload({ files = [], onFilesChange, label = 'Upload Project Files' }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const addFiles = (newFiles) => {
    const added = Array.from(newFiles).map(f => ({
      url: URL.createObjectURL(f),
      type: f.type,
      name: f.name,
      file: f
    }));
    const combined = [...files, ...added];
    onFilesChange(combined);
  };

  const removeFile = (i) => {
    const next = files.filter((_, idx) => idx !== i);
    onFilesChange(next);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  };

  return (
    <div>
      <div
        className={`upload-zone ${dragging ? 'active' : ''}`}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
      >
        <div className="upload-icon">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
        </div>
        <p><strong style={{ color: 'var(--text)' }}>Drop files here</strong> or click to browse</p>
        <p style={{ fontSize: '12px', marginTop: '4px' }}>STL, PNG, JPEG, DXF, DWG, MP4, MOV, WEBM</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ACCEPT_STRING}
        style={{ display: 'none' }}
        onChange={e => { if (e.target.files?.length) addFiles(e.target.files); }}
      />
      {files.length > 0 && (
        <div className="uploaded-files">
          {files.map((f, i) => (
            <div key={i} className="file-preview">
              <button className="remove-btn" onClick={e => { e.stopPropagation(); removeFile(i); }}>×</button>
              {f.type?.startsWith('image/') ? (
                <img src={f.url} alt={f.name} />
              ) : f.type?.startsWith('video/') ? (
                <video src={f.url} style={{ width: '100%', height: '100px', objectFit: 'cover' }} />
              ) : (
                <div className="file-icon">
                  <span style={{ fontSize: '28px' }}>{getFileIcon(f)}</span>
                  <span style={{ fontSize: '10px', color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {f.name?.split('.').pop()?.toUpperCase()}
                  </span>
                </div>
              )}
              <div className="file-name">{f.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
