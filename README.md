# Workflow Automation Builder

A **drag-and-drop workflow automation tool** using **React Flow, React Hook Form, and React Table**.

## 🚀 Features

Drag and drop node types (**Task, Condition, Notification**) onto the canvas.  
Connect nodes visually to define workflow logic.  
Edit node properties via a form-based configuration panel.  
View all nodes in a tabular summary with **inline editing**.  
Undo/Redo actions for quick modifications.  
Import/Export workflow **JSON** files.  

---

## 📌 Installation

### 1️⃣ **Clone the Repository**
```bash
git clone https://github.com/yashcoolkarni/workflow-automation-builder.git
cd workflow-automation-builder
```

### 2️⃣ **Install Dependencies**
Using **npm**:
```bash
npm install
```
Or using **Yarn**:
```bash
yarn install
```

### 3️⃣ **Run the Development Server**
Using **npm**:
```bash
npm start
```
Or using **Yarn**:
```bash
yarn start
```
🚀 The app should now be running at **http://localhost:3000**

---


## 🎯 Usage Guide

### 🏗 **Create a Workflow**
1️⃣ Drag and drop node types (**Task, Condition, Notification**) from the sidebar onto the canvas.  
2️⃣ Connect nodes by dragging between connection handles.  

### ⚙️ **Configure Nodes**
- Click on a node to open its **configuration panel**.
- Edit fields like **label, assignee, due date, condition expression, or notification details**.
- **Save** changes to update the node.

### 📊 **Manage Workflow Summary**
- Open the **summary modal** to view all nodes in a table.
- **Edit node labels and statuses inline**.
- Use **Undo/Redo** for quick adjustments.
- Export workflows as **JSON** or import existing workflows.

---

## 🚀 Future Enhancements

🔹 **Workflow Execution Engine**: Simulate or execute workflows with a backend engine.  
🔹 **Real-Time Collaboration**: Enable multiple users to edit the same workflow with **WebSockets**.  
🔹 **Version Control**: Save and load workflows with version history.  
🔹 **API Integration**: Trigger external services or webhooks directly from the workflow.  

---

## 🤝 Contributing

Contributions are **welcome**! To contribute:
1. **Fork** the repository.
2. Create a **feature branch**: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Add new feature"`
4. Push the branch: `git push origin feature-name`
5. Open a **Pull Request**.

---

## 📜 License

This project is licensed under the **MIT License**.

---
