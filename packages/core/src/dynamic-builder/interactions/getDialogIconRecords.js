const getDialogIconRecords = () => ({
  success: { color: '#16a34a', markup: '<path d="m5 13 4 4L19 7"/>' },
  info: { color: '#2563eb', markup: '<path d="M12 8h.01"/><path d="M11 12h1v4h1"/>' },
  warning: { color: '#d97706', markup: '<path d="M12 7v6"/><path d="M12 17h.01"/>' },
  error: { color: '#dc2626', markup: '<path d="m8 8 8 8"/><path d="m16 8-8 8"/>' },
  question: {
    color: '#4f46e5',
    markup: '<path d="M9.5 9.5a2.5 2.5 0 1 1 3.6 2.3c-.7.3-1.1.9-1.1 1.6v.6"/><path d="M12 17h.01"/>',
  },
});

export default getDialogIconRecords;
