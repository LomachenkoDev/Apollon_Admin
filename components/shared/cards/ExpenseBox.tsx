import React from "react";
import DoughnutChart from "../charts/DoughnutChart";
import {
  totalMonthFromEachMainCategory,
  totalSumFromAllCategories,
} from "@/lib/actions/expenses.action";

import { cn } from "@/lib/utils";
import AnimatedCounter from "../AnimatedCounter";
import { getMonthlyIncome } from "@/lib/actions/service.action";

const ExpenseBox = async ({ searchParams }: any) => {
  const [total, totalSum] = await Promise.all([
    totalMonthFromEachMainCategory(),
    totalSumFromAllCategories(),
  ]);
  const monthlyIncome = await getMonthlyIncome();

  return (
    <section
      className="total-balance background-light900_dark200 
    "
    >
      <div className="flex flex-row items-center gap-8">
        <div className="total-balance-chart">
          <DoughnutChart total={total} />
        </div>
        <div
          className="text-dark400_light900 flex h-full min-w-[200px] flex-col justify-center gap-2
  text-center"
        >
          <span className="font-noto_sans text-xl font-semibold">
            {" "}
            Κατηγορίες : <span className="text-blue-500">{total.length}</span>
          </span>
          <span className=" text-lg text-slate-600 dark:text-slate-300">
            Μηνιαία Έξοδα/Έσοδα
          </span>
          <div className="flex flex-row items-center justify-center gap-2">
            <span className=" flex flex-row text-center font-noto_sans text-lg font-bold text-red-700 dark:text-red-500">
              <AnimatedCounter amount={totalSum ? totalSum[0].totalSum : 0} />
            </span>
            {"/"}
            <span className=" text-center font-noto_sans text-lg font-bold text-blue-700 dark:text-blue-500">
              <AnimatedCounter amount={monthlyIncome} />
            </span>
          </div>
        </div>
      </div>

      <div
        className={cn("flex w-full flex-row justify-end ", {
          "self-start": totalSum,
          "self-center": !totalSum,
        })}
      ></div>
    </section>
  );
};

export default ExpenseBox;
