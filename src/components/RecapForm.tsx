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
    id: string;
    heads: head[];
    grades: grade[];
};

export default function RecapForm() {
    return (
        <>
            <div>RecapFprm</div>
        </>
    );
}
