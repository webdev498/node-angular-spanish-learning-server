//@flow
type NodeProcess = {
  env: Object;
  send: (message: Object) => void;
};

declare var process: NodeProcess;
