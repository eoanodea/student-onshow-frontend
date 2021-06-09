import AddItem from "../pages/AddItem";

/**
 * Route Types
 */
export type IRouteType = {
  name: string;
  link: string;
  component: any;
  authed: boolean;
};

/**
 * Defines all routes for the application
 *
 * @param {string} name - The name of the route
 * @param {string} link - The link to he route
 * @param {JSX.Element} component - The component to be rendered
 * @param {bool} authed - Whether the user needs to be authenticated to view this route
 */
const routes: IRouteType[] = [
  {
    name: "Add",
    link: "/add",
    component: AddItem,
    authed: false,
  },
];

export default routes;
