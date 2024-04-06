"use client";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export function DateInput({ field, maxwidth }: any) {
  const [stringDate, setStringDate] = React.useState<string>(
    field.value ? format(new Date(field.value), "dd/MM/yyyy") : ""
  );
  // eslint-disable-next-line no-unused-vars
  const [date, setDate] = React.useState<Date>();
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  return (
    <Popover>
      <div className={cn("relative", maxwidth)}>
        <Input
          className="background-light900_dark300 text-dark300_light700 paragraph-regular light-border-2 form_input max-w-[400px] font-noto_sans font-bold"
          type="string"
          value={stringDate}
          onChange={(e) => {
            const inputDate = e.target.value;
            setStringDate(inputDate);
            field.onChange(inputDate);
            const [day, month, year] = inputDate.split("/");
            const parsedDate = new Date(`${year}-${month}-${day}`);
            if (isNaN(parsedDate.getTime())) {
              setErrorMessage("Invalid Date");
              field.onChange("");
            } else {
              setErrorMessage("");
              field.onChange(parsedDate);
            }
          }}
        />
        {errorMessage !== "" && (
          <div className="absolute bottom-[-1.75rem] left-0 text-sm text-red-400">
            {errorMessage}
          </div>
        )}
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "font-normal absolute right-0 translate-y-[-50%] top-[50%] border-none mr-2",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="h-4 w-4 " />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="background-light900_dark300 text-dark300_light700 absolute right-[-30px] top-0 w-auto p-0 font-changa">
        <Calendar
          className="rounded-md border shadow"
          mode="single"
          selected={field.value}
          disabled={(date) => date < new Date("1900-01-01")}
          onSelect={(selectedDate) => {
            if (!selectedDate) return;

            field.onChange(selectedDate);
            setStringDate(format(selectedDate, "dd/MM/yyyy"));
            setErrorMessage("");
          }}
          defaultMonth={date}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
