import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

export type IVote = 'upvote' | 'downvote'

export class Vote {
  @ObjectIdColumn()
  _id: ObjectID

  @Column()
  type: IVote
}

export class Star {
  @ObjectIdColumn()
  _id: ObjectID
}

export class Comment {
  @ObjectIdColumn()
  _id: ObjectID

  @Column()
  text: string

  @Column()
  vote: Vote
}


class ReactMap {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  map: {
    username: "quanprolazer";
    roadmap: [
      {
        "fundamental-topics": [
          {
            "create-react-app": true;
            jsx: true;
            components: {
              "functional-components": false;
              "class-components": true;
            };
            "props-vs-state": true;
            "conditional-rendering": true;
          },
          {
            "component-life-cycle": true;
            "lists-and-keys": false;
            "composition-and-inheritance": false;
            "basic-hook": {
              usestate: false;
              useeffect: false;
            };
          }
        ];
      },
      {
        "advanced-topics": [
          {
            hooks: {
              "writing-your-own-hooks": false;
              "common-hooks": {
                usecallback: false;
                useref: false;
                usememo: false;
                usereducer: true;
                usecontext: false;
              };
            };
            context: false;
            refs: false;
            "render-props": false;
            "code-splitting": false;
          },
          {
            "high-order-components": false;
            portals: false;
            "error-boundaries": false;
            "fiber-architecture": false;
          }
        ];
      },
      {
        ecosystem: [
          {
            routers: {
              "react-router": false;
              "reach-router": false;
            };
          },
          {
            ssr: {
              nextjs: false;
            };
          },
          {
            ssg: {
              nextjs: false;
              gatsby: false;
            };
          },
          {
            "api-calls": {
              axios: false;
              unfetch: false;
              superagent: false;
              "use-http": false;
            };
          },
          {
            mobile: {
              "react-native": false;
            };
          },
          {
            form: {
              "react-hook-form": false;
              formik: false;
              "final-form": false;
            };
          },
          {
            testing: {
              jest: false;
              "react-testing-library": false;
              cypress: false;
            };
          },
          {
            "state-management": {
              "context/state": false;
              redux: false;
              mobx: false;
            };
          },
          {
            styling: {
              charkaui: false;
              materialui: false;
              "ant-design": false;
              "styled-components": false;
              emotion: false;
            };
          }
        ];
      }
    ];
    comments: Comment
    stars: Star
  };

}


type MapType = 'reactroad' | 'fontendroad'

class FrontEndMap {

}

class Maps {
  @Column()
  reactroad: ReactMap

  @Column()
  frontendroad: FrontEndMap
}



@Entity({ name: "roads" })
export default class Road extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectID


  @Column()
  name: MapType

  // @Column()
  // maps: Maps
}
