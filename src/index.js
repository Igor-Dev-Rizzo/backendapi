const express = require("express");
const app = express();
const { uuid } = require("uuidv4");
app.use(express.json());

const projects = [];

app.get("/projects", (request, response) => {
  //const query = request.query;
  //console.log(query);

  return response.json(projects);
});

app.post("/projects", (request, response) => {
  const { title, owner } = request.body;
  const project = { id: uuid(), title, owner };

  projects.push(project);

  return response.json(project);
});

app.put("/projects/:id", (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex((project) => project.id == id);
  if (projectIndex < 0) {
    return response.status(400).json({ error: "Project not found" });
  }

  const project = {
    id,
    title,
    owner,
  };
  projects[projectIndex] = project;
  return response.json(project);
});

app.delete("/projects/:id", (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex((project) => project.id == id);
  if (projectIndex < 0) {
    return response.status(400).json({ error: "Project not found" });
  }
  projects.splice(projectIndex, 1);

  return response.status(204).send();
});

app.listen(3333, () => {
  console.log("Back-end iniciado! (●'◡'●)");
});
