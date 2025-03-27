import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  PanelContainer,
  Form,
  SaveButton,
} from "../../assets/styles";
import { TextField } from "../../components/textfield";
import { DateField } from "../../components/dateField";

const NodeConfigPanel = ({ selectedNode, onUpdateNode, onClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: selectedNode?.data,
  });

  useEffect(() => {
    if (selectedNode) {
      setValue("label", selectedNode.data.label || "");

      if (selectedNode.type === "taskNode") {
        setValue("assignee", selectedNode.data.assignee || "");
        setValue("dueDate", selectedNode.data.dueDate || "");
      } else if (selectedNode.type === "conditionNode") {
        setValue("conditionExpression", selectedNode.data.conditionExpression || "");
      } else if (selectedNode.type === "notificationNode") {
        setValue("message", selectedNode.data.message || "");
        setValue("recipient", selectedNode.data.recipient || "");
      }
    }
  }, [selectedNode, setValue]);

  const onSubmit = (data) => {
    onUpdateNode(selectedNode.id, data);
    onClose();
  };

  return (
    <PanelContainer>
      <h3>
        Configure {selectedNode.data.label}{" "}
        <small>({selectedNode.type.replace("Node", "")})</small>
      </h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          labelText="Label:"
          name="label"
          register={register}
          errors={errors}
          required="Label is required"
        />

        {/* Fields for Task Node */}
        {selectedNode.type === "taskNode" && (
          <>
            <TextField
              labelText="Assignee:"
              name="assignee"
              register={register}
              errors={errors}
              required="Assignee is required"
            />
            <DateField
              labelText="Due Date:"
              name="dueDate"
              register={register}
              errors={errors}
              required="Due date is required"
              validate={(value) => {
                const today = new Date().toISOString().split("T")[0];
                return value >= today || "Due date must be today or later";
              }}
            />
          </>
        )}

        {/* Fields for Condition Node */}
        {selectedNode.type === "conditionNode" && (
          <TextField
            labelText="Condition Expression:"
            name="conditionExpression"
            register={register}
            errors={errors}
            required="Condition expression is required"
          />
        )}

        {/* Fields for Notification Node */}
        {selectedNode.type === "notificationNode" && (
          <>
            <TextField
              labelText="Message:"
              name="message"
              register={register}
              errors={errors}
              required="Message is required"
            />
            <TextField
              labelText="Recipient:"
              name="recipient"
              register={register}
              errors={errors}
              required="Recipient is required"
            />
          </>
        )}

        <SaveButton type="submit">Save</SaveButton>
      </Form>
    </PanelContainer>
  );
};

export default NodeConfigPanel;
