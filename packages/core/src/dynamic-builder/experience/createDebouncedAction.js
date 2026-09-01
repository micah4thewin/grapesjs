const createDebouncedAction = (runAction, quietMilliseconds) => {
  let lastRunAt = 0;
  return (...actionArgs) => {
    const nowTime = performance.now();
    if (nowTime - lastRunAt < quietMilliseconds) return;
    lastRunAt = nowTime;
    runAction(...actionArgs);
  };
};

export default createDebouncedAction;
