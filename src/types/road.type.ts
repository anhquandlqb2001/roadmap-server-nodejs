import { IDataToClient, IRoad } from "./index.type";
import { ObjectID } from "./comment.type";

export type TRoadName = "REACT" | "FRONT_END" | "BACK_END"

// du lieu gui ve server - thay doi 1 truong trong road
interface IDataFieldChange {
    map: TRoadName,
    field: string,
    valueChange: string
}

// du lieu gui len client - du lieu cua road
interface IDataRoad extends IDataToClient {
    road: Object
}


interface INoteDataFromClient {
    roadID: ObjectID,
    text: string
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

// example road
// const reactmap: IRoad = {
//     _id: 23, // id map
//     name: "REACT", // map name
//     stars: [22, 32], // array of userID
//     comments: [
//         {
//             _id: 1, // comment id
//             userID: 2231, // user id comment
//             text: "Asd",
//             reply: [
//                 {
//                     _id: 231, // comment reply id
//                     text: "asd",
//                     userID: 21 // userid comment
//                 },
//                 {
//                     _id: 123, // commen treply id
//                     text: "asd",
//                     userID: 21 // userid comment
//                 }
//             ],
//             vote: [
//                 {
//                     userID: 21, // user id
//                     type: "UPVOTE"
//                 },
//                 {
//                     userID: 12, // user id
//                     type: "DOWNVOTE"
//                 }
//             ]
//         }
//     ]
// }
