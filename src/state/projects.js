import _ from "lodash";
import React, { createContext, useContext, useEffect, useState } from "react";
import { projectsRef } from "../config/firebase";
import Spinner from "../components/spinner";

export const StateContext = createContext();

const lsID =
  process.env.NODE_ENV === "development" ? "projects-dev" : "projects";

const getProjectsLS = () => {
  const projects = localStorage.getItem(lsID);

  if (!projects) {
    return [];
  }

  return JSON.parse(projects);
};

const addToLocalStorage = newProject => {
  const projects = getProjectsLS();

  const updated = [newProject, ...projects];

  localStorage.setItem(lsID, JSON.stringify(updated));

  return updated;
};

export const StateProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [oneProject, setOneProject] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const projects = getProjectsLS();

    setLoading(false);
    setProjects(projects);
  }, []);

  const onAddProject = name => {
    const newProject = {
      id:
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15),
      name,
      createdAt: new Date().toUTCString()
    };

    projectsRef.push().set(newProject);

    const projects = addToLocalStorage(newProject);

    setProjects(projects);
  };

  const findProject = id => {
    projectsRef
      .orderByChild("id")
      .equalTo(id)
      .on("value", snapshot => {
        const res = snapshot.val();

        if (!res) {
          return null;
        }

        setOneProject(_.first(_.toArray(res)));
      });
  };

  const context = {
    projects,
    onAddProject,
    oneProject,
    findProject
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <StateContext.Provider value={context}>{children}</StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
