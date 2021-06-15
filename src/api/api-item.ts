import { config } from "../config/config";
import { IItem } from "../types";

const prefix = config.server_url + "/api/item";

/**
 * Fetch a list of Items
 *
 */
export const list = async () => {
  try {
    const response = await fetch(prefix, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

/**
 * Fetch an Item by ID
 *
 * @param {id: String}
 */
export const show = async (id: string) => {
  try {
    const response = await fetch(`${prefix}/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

/**
 * Create an Item
 *
 * @param {body: {author: String, link: String}} body
 */
export const create = async (body: IItem) => {
  try {
    const response = await fetch(`${prefix}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

/**
 * Update an Item
 *
 * @param {id: String}
 * @param {body: {title: String, body: String, category_id: Int}} body
 */
export const update = async (id: string, body: IItem) => {
  try {
    const response = await fetch(`${prefix}/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

/**
 * Update an Item
 *
 * @param {id: String}
 */
export const vote = async (id: string, unvote: boolean) => {
  try {
    const response = await fetch(`${prefix}/vote/${id}/${unvote}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

/**
 * Removes a Item by ID
 *
 * @param {id: String}
 * @param {token: String}
 */
export const remove = async (id: string) => {
  try {
    const response = await fetch(`${prefix}/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    return response.status;
  } catch (err) {
    return console.log(err);
  }
};
