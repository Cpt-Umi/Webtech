import { useEffect, useState } from "react";
import axios from "axios";
import RecapForm from "./RecapForm";

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

// type grade = {
//   _id: string;
//   gradeid: number;
//   start: number;
//   end: number;
//   grade: string;
//   gpa: number;
// };

type total = {
  regno: string;
  grade: string;
};

export default function RecapSheet() {
  const [student, setStudent] = useState<student[]>([]);
  const [grade, setGrade] = useState<total[]>([]);
  const [heads, setHeads] = useState<head[]>([]);
  const [regno, setRegno] = useState("");

  useEffect(() => {
    axios.get(`/api/student`).then((res) => setStudent(res.data));
    axios.get(`/api/grade`).then((res) => setGrade(res.data));
    axios.get(`/api/heads`).then((res) => setHeads(res.data));
  }, []);

  const getTotal = (student: student): number => {
    const initialValue = 0;
    const total = student.marks.reduce(
      (acc, mark) => acc + mark.marks,
      initialValue
    );
    return total;
  };

  const handler = (regno: string): void => {
    console.log(regno);
    setRegno(regno);
  };

  // const getGrade = (student: student): total[] => {
  //   const studentGrade = grade.filter((grade) =>
  //     student.regno === grade.regno ? grade.grade : "A"
  //   );
  //   // studentGrade.map((grade) => console.log(grade));
  //   return studentGrade;
  // };

  return (
    <>
      <div className="col">
        <table>
          <tbody>
            <tr>
              <th>S NO</th>
              <th>Name</th>
              <th>Regno</th>
              <th>Quiz1</th>
              <th>Quiz2</th>
              <th>Assign. 1</th>
              <th>Assign. 2</th>
              <th>Final. 1</th>
              <th>Mid Term. 1</th>
              <th>Project. 1</th>
              <th>CP</th>
              <th>Total</th>
              <th>Grade</th>
            </tr>
            {student.map((student) => {
              return (
                <tr>
                  <td></td>
                  <td>
                    <a href="#" onClick={() => handler(student.regno)}>
                      {student.name}
                    </a>
                  </td>
                  <td>{student.regno}</td>
                  {student.marks
                    .sort((a, b) => a.hid - b.hid)
                    .map((mark) => (
                      <>
                        <td>{mark.marks}</td>
                      </>
                    ))}
                  <td>{getTotal(student)}</td>
                  {grade.map((grade) => {
                    if (student.regno === grade.regno)
                      return <td>{grade.grade}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="col">
        {regno !== "" && <RecapForm regno={regno} heads={heads} />}
      </div>
    </>
  );
}
