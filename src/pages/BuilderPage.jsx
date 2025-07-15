import React, { useState } from "react";
import FieldPreviewCard from "../components/FormBuilder/FieldPreviewCard";
import {
  PencilIcon,
  DocumentTextIcon,
  HashtagIcon,
  ListBulletIcon,
  CheckCircleIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const fieldTypes = [
  {
    id: 1,
    type: "text",
    icon: <PencilIcon className="w-6 h-6 text-gray-600" />,
    label: "Short Answer",
  },
  {
    id: 2,
    type: "textarea",
    icon: <DocumentTextIcon className="w-6 h-6 text-gray-600" />,
    label: "Paragraph",
  },
  {
    id: 3,
    type: "number",
    icon: <HashtagIcon className="w-6 h-6 text-gray-600" />,
    label: "Number",
  },
  {
    id: 4,
    type: "dropdown",
    icon: <ListBulletIcon className="w-6 h-6 text-gray-600" />,
    label: "Dropdown",
  },
  {
    id: 5,
    type: "boolean",
    icon: <CheckCircleIcon className="w-6 h-6 text-gray-600" />,
    label: "Yes / No",
  },
];

const BuilderPage = () => {
  const [sections, setSections] = useState(() => {
    const saved = localStorage.getItem("form_sections");
    return saved ? JSON.parse(saved) : [];
  });

  const addSection = () => {
    const newSection = {
      id: `section-${Date.now()}`,
      title: "",
      isEditing: true,
      fields: [],
    };
    setSections([...sections, newSection]);
  };

  const removeSection = (id) => {
    const updated = sections.filter((s) => s.id !== id);
    setSections(updated);
    localStorage.setItem("form_sections", JSON.stringify(updated));
  };

  const validateSection = (section) => {
    if (!section.title.trim()) return false;

    return section.fields.every((f) => {
      if (!f.label?.trim()) return false;
      if (f.type === "dropdown") {
        return f.options?.every((opt) => opt.trim());
      }
      return true;
    });
  };

  const saveData = () => {
    localStorage.setItem("form_sections", JSON.stringify(sections));
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (source.droppableId === "toolbox") {
      const field = {
        id: `field-${Date.now()}`,
        type: draggableId,
        label: "Untitled Field",
        ...(draggableId === "dropdown" && {
          options: ["Option 1", "Option 2", "Option 3"],
        }),
      };
      const updated = [...sections];
      const section = updated.find((s) => s.id === destination.droppableId);
      if (section) {
        section.fields.splice(destination.index, 0, field);
        section.isEditing = true;
        setSections(updated);
      }
    } else {
      const sourceSection = sections.find((s) => s.id === source.droppableId);
      const destSection = sections.find(
        (s) => s.id === destination.droppableId
      );
      const [moved] = sourceSection.fields.splice(source.index, 1);
      destSection.fields.splice(destination.index, 0, moved);
      setSections([...sections]);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-screen">
        <div className="w-1/4 bg-gray-100 p-4 border-r">
          <h2 className="text-xl font-semibold mb-4">Fields</h2>
          <Droppable droppableId="toolbox" isDropDisabled={false}>
            {(provided) => (
              <div
                className="grid grid-cols-2 gap-3"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {fieldTypes.map((field, index) => (
                  <Draggable
                    draggableId={`${field.type}`}
                    index={index}
                    key={field.id}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex flex-col items-center justify-center gap-1 h-32 bg-gray-50 border hover:bg-gray-100 p-3 rounded w-full text-center"
                      >
                        {field.icon}
                        <span className="text-sm font-medium text-gray-800">
                          {field.label}
                        </span>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div className="flex-1 p-6 overflow-auto">
          <h2 className="text-xl font-semibold mb-4">Form Builder</h2>
          {sections.map((section, sIdx) => (
            <Droppable droppableId={section.id} key={section.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="border p-4 rounded mb-4 bg-white"
                >
                  <div className="mb-2">
                    <input
                      type="text"
                      className="font-semibold text-lg border-b w-full"
                      value={section.title}
                      placeholder="Enter Your Title Here *"
                      onChange={(e) => {
                        const updated = [...sections];
                        updated[sIdx].title = e.target.value;
                        updated[sIdx].isEditing = true;
                        setSections(updated);
                      }}
                    />
                  </div>
                  {section.fields.map((field, fIdx) => (
                    <Draggable
                      draggableId={field.id}
                      index={fIdx}
                      key={field.id}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <FieldPreviewCard
                            label={field.label}
                            type={field.type}
                            options={field.options}
                            onLabelChange={(newLabel) => {
                              const updated = [...sections];
                              updated[sIdx].fields[fIdx].label = newLabel;
                              updated[sIdx].isEditing = true;
                              setSections(updated);
                            }}
                            onOptionChange={(idx, val) => {
                              const updated = [...sections];
                              updated[sIdx].fields[fIdx].options[idx] = val;
                              updated[sIdx].isEditing = true;
                              setSections(updated);
                            }}
                            onAddOption={() => {
                              const updated = [...sections];
                              updated[sIdx].fields[fIdx].options.push(
                                `Option ${
                                  updated[sIdx].fields[fIdx].options.length + 1
                                }`
                              );
                              updated[sIdx].isEditing = true;
                              setSections(updated);
                            }}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <div className="flex justify-between items-center mt-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSection(section.id);
                      }}
                    >
                      <TrashIcon className="w-6 h-6 text-red-600" />
                    </button>

                    {section.isEditing && (
                      <button
                        className="px-4 py-1 rounded border bg-black text-white hover:bg-black font-bold"
                        onClick={() => {
                          if (validateSection(section)) {
                            const updated = [...sections];
                            updated[sIdx].isEditing = false;
                            setSections(updated);
                            saveData();
                          } else {
                            alert("Please fill all required options.");
                          }
                        }}
                      >
                        Done
                      </button>
                    )}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
          <div
            onClick={addSection}
            className="border p-6 rounded min-h-[100px] bg-white flex justify-center items-center hover:cursor-pointer"
          >
            <button
              className={`flex items-center gap-2 ${
                sections.length >= 5 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <PlusIcon className="w-5 h-5" />
              Add Field
            </button>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default BuilderPage;
