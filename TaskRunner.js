// Task Runner
class TaskRunner {
  constructor(limit = 1){
    this.limit = limit;
    this.queue = [];
    this.running = 0;
  }
  
  run(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({task, resolve, reject});
      this._next();
    });
  }
  
  _next(){
    if (!this.queue.length) return;
    if (this.running >= this.limit) return;
    
    const { task, resolve, reject } = this.queue.shift();
    this.running++;
    
    Promise.resolve().then(task).then(resolve).catch(reject).finally(() => {
      this.running--;
      this._next();
    });
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const createTask = async (taskName, ms) => {
  console.log(`${taskName} started`);
  await delay(ms);
  console.log(`${taskName} ended`);
  return taskName;
}

const runner = new TaskRunner(3);
runner.run(createTask("T1", 1000));
runner.run(createTask("T2", 2000));
runner.run(createTask("T3", 3000));
runner.run(createTask("T4", 4000));
runner.run(createTask("T5", 5000));
