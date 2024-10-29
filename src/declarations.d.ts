declare module '*.png' {
    const value: string;
    export default value;
  }
  
  declare module '*.jpg' {
    const value: string;
    export default value;
  }

  declare module '*.mp4' {
    const src: string;
    export default src;
  }
  
  
  declare module '*.svg' {
    const value: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default value;
  }

  declare module "*.json" {
    const value: any;
    export default value;
  }
  
  declare module '*.jpeg' {
    const value: string;
    export default value;
  }
  