import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";

type mark = {
  _id: string;
  hid: number;
  marks: number;
};

type student = {
  _id: string;
  regno: string;
  name: string;
  marks: mark[];
};

type head = {
  _id: student;
  hid: number;
  headname: string;
  total: number;
};

type grade = {
  _id: string;
  gradeid: number;
  start: number;
  end: number;
  grade: string;
  gpa: number;
};

type Prop = {
  regno: string;
  heads: head[];
  grades?: grade[];
};

export default function RecapForm({ regno, heads }: Prop) {
  const [student, setStudent] = useState<student>(Object);

  const getStudentById = async (regno: string) => {
    const student: student = (await axios.get(`/api/student/${regno}`)).data;
    setStudent(student);
  };

  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setStudent({...student, [event.target.name.]})
  // }

  useEffect(() => {
    getStudentById(regno);
  }, [regno]);

  return (
    <>
      <div>RecapForm</div>
      <table>
        <tbody>
          {heads
            .sort((a, b) => a.hid - b.hid)
            .map((head, index) => (
              <tr key={index}>
                <td>{head.headname}</td>
                <td>
                  {student.marks.map((mark) =>
                    head.hid === mark.hid ? (
                      <input
                        name="marks"
                        value={mark.marks}
                        // onChange={handleChange}
                      />
                    ) : (
                      ""
                    )
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <p>{student.regno}</p>
      <pre>{JSON.stringify(student, null, 2)}</pre>
    </>
  );
}
