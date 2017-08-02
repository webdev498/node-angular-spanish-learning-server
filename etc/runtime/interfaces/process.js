//@flow
type NodeProcess = {
  env: Object;
  send: (message: Object) => void;
  versions: Object;
  cwd: () => string;
};

declare var process: NodeProcess;
