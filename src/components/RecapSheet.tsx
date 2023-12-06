import React, { useEffect, useState } from "react";
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

type grade = {
    _id: string;
    gradeid: number;
    start: number;
    end: number;
    grade: string;
    gpa: number;
};

export default function RecapSheet() {
    return (
        <>
            <div>RecapSheet</div>
        </>
    );
}
