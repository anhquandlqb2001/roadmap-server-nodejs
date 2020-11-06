export enum EMap  {
  React = "REACT",
  FrontEnd = "FRONT_END",
  BackEnd = "BACK_END"
}

export type TReact = [
  {
    "fundamental-topics": [
      {
        "create-react-app": boolean;
        jsx: boolean;
        components: {
          "functional-components": boolean;
          "class-components": boolean;
        };
        "props-vs-state": boolean;
        "conditional-rendering": boolean;
      },
      {
        "component-life-cycle": boolean;
        "lists-and-keys": boolean;
        "composition-and-inheritance": boolean;
        "basic-hook": {
          usestate: boolean;
          useeffect: boolean;
        };
      }
    ];
  },
  {
    "advanced-topics": [
      {
        hooks: {
          "writing-your-own-hooks": boolean;
          "common-hooks": {
            usecallback: boolean;
            useref: boolean;
            usememo: boolean;
            usereducer: true;
            usecontext: boolean;
          };
        };
        context: boolean;
        refs: boolean;
        "render-props": boolean;
        "code-splitting": boolean;
      },
      {
        "high-order-components": boolean;
        portals: boolean;
        "error-boundaries": boolean;
        "fiber-architecture": boolean;
      }
    ];
  },
  {
    ecosystem: [
      {
        routers: {
          "react-router": boolean;
          "reach-router": boolean;
        };
      },
      {
        ssr: {
          nextjs: boolean;
        };
      },
      {
        ssg: {
          nextjs: boolean;
          gatsby: boolean;
        };
      },
      {
        "api-calls": {
          axios: boolean;
          unfetch: boolean;
          superagent: boolean;
          "use-http": boolean;
        };
      },
      {
        mobile: {
          "react-native": boolean;
        };
      },
      {
        form: {
          "react-hook-form": boolean;
          formik: boolean;
          "final-form": boolean;
        };
      },
      {
        testing: {
          jest: boolean;
          "react-testing-library": boolean;
          cypress: boolean;
        };
      },
      {
        "state-management": {
          "context/state": boolean;
          redux: boolean;
          mobx: boolean;
        };
      },
      {
        styling: {
          charkaui: boolean;
          materialui: boolean;
          "ant-design": boolean;
          "styled-components": boolean;
          emotion: boolean;
        };
      }
    ];
  }
];

