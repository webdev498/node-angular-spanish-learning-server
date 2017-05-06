//@flow
type NodeProcess = {
  env: Object;
  send: (message: Object) => void;
  versions: Object;
};

declare var process: NodeProcess;
