import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./TextEditor.css";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import Quill from "quill";
const TextEditor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [quill, setQuill] = useState();
  const [socket, setSocket] = useState();
  const [isGenuine, setIsGenuine] = useState(false);
  console.log(location.state);
  const { doc_id, _id, createdBy, doc_name } = location.state || {};
  const [userCount, setUserCount] = useState(0);
  useEffect(() => {
    if (!_id || !doc_name || !doc_id || !createdBy) {
      setIsGenuine(false);
      navigate("/", { replace: true });
    } else {
      setIsGenuine(true);
    }
  }, []);

  // Quill Editor
  const editorWrapper = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const quillInstance = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ direction: "rtl" }],
          [{ size: ["small", false, "large", "huge"] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
          ["clean"],
          ["link", "image", "video"],
        ],
      },
    });
    quillInstance.disable();
    quillInstance.setText("Loading...");
    setQuill(quillInstance);
  }, []);

  // initialize socket
  useEffect(() => {
    // if (!quill) return () => {};
    const socketInstance = io("http://localhost:3000", { query: { doc_id } });
    socketInstance.on("connect", () => {
      console.log("Connected to server");
    });
    socketInstance.on("disconnect", () => {
      console.log("Disconnected from server");
    });
    setSocket(socketInstance);
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Load document data
  useEffect(() => {
    if (!quill || !socket) return;
    const handleLoadDoc = (data) => {
      quill.setContents(data);
      quill.enable();
    }
    socket.emit('prepare-doc', doc_id);
    socket.on('load-doc', handleLoadDoc)
    socket.emit('inc-user-count', doc_id)
    socket.on('display-user-count', (data) => {
      console.log(data, "=========");
      setUserCount(data)
    })

    return () => {
      socket.off('load-doc', handleLoadDoc)
    }
  }, [quill, socket])

  // Exchanging real time data
  useEffect(() => {
    if(!quill || !socket) return;
    const handleEditorDataChange = (delta, oldDelta, source) => {
      if (source === "user") {
        socket.emit("send-changes", {delta, doc_id});
      }
    }
    quill.on("text-change", handleEditorDataChange);

    return () => {
      quill.off("text-change", handleEditorDataChange);
    } 
  }, [quill, socket])

  // Recieve Changes
  useEffect(() => {
    if(!quill || !socket) return;
    const handleReceiveChange = (delta) => {
      quill.updateContents(delta);
      quill.setSelection(quill.getLength());
    }
    socket.on('receive-changes', handleReceiveChange)
    return () => {
      socket.off('receive-changes', handleReceiveChange)
    }
  }, [quill, socket])

  // Save Chnages to DB 
  useEffect(() => {
    if (!quill || !socket) return;
    const interval = setInterval(() => {
      const delta = quill.getContents()
      socket.emit('save-changes', {delta, doc_id})
    }, 2000)
    return () => {
      clearInterval(interval)
    }
  },[quill, socket])

  return (
    <>
      <div className="editor-container" ref={editorWrapper}></div>
      <button id="counter">{userCount}</button>
    </>
  );
};

export default TextEditor;
