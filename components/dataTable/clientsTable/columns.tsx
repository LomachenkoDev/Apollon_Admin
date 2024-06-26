"use client";

import { ColumnDef } from "@tanstack/react-table";

import { formatDateString } from "@/lib/utils";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import Image from "next/image";
import Link from "next/link";
export const columns: ColumnDef<any>[] = [
  {
    id: "actions",
    enableHiding: false,

    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
  {
    id: "Client",
    enableHiding: true,
    enableGlobalFilter: true,
    columns: [
      {
        id: "grouped&sorted",
        accessorFn: (row) => `${row.firstName} ${row.lastName} `,
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="Όνομα"
            imgurl="/assets/icons/client.svg"
          />
        ),
        cell: ({ row }) => {
          return (
            <Link href={`/clients/${row.original?._id}`}>
              <div>{row.getValue("grouped&sorted")}</div>{" "}
            </Link>
          );
        },
      },
      {
        id: "dognames",
        accessorFn: (row) => {
          if (row.dog) {
            const names = row.dog.map((item: any) => {
              return item.name;
            });

            return names.join(" ");
          } else {
            return null;
          }
        },
        header: () => (
          <div className="ml-4 flex flex-row items-center leading-[26px]">
            Ονομα Σκυλου{" "}
          </div>
        ),
        cell: ({ row }) => {
          const see: string = row.getValue("dognames");

          return (
            <div className="ml-2 flex flex-col gap-2 leading-6">{see} </div>
          );
        },
      },

      {
        accessorKey: "profession",
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="Επάγγελμα"
            imgurl="/assets/icons/profession.svg"
          />
        ),
      },

      {
        accessorKey: "location.city",
        header: () => (
          <div className="mr-4 flex flex-row items-center gap-2">
            <Image
              src={"/assets/icons/city.svg"}
              alt="city"
              width={30}
              height={25}
            />
            Πόλη
          </div>
        ),
      },
      {
        accessorKey: "location.address",
        header: () => (
          <div className="mr-4 flex flex-row items-center gap-2">
            <Image
              src={"/assets/icons/address.svg"}
              alt="residence"
              width={30}
              height={25}
            />
            Διεύθυνση
          </div>
        ),
      },
      {
        accessorKey: "location.residence",
        header: () => (
          <div className="mr-4 flex flex-row items-center gap-2">
            <Image
              src={"/assets/icons/residence.svg"}
              alt="residence"
              width={30}
              height={25}
            />
            Κατοικία
          </div>
        ),
      },

      {
        accessorKey: "phone.telephone",
        header: () => (
          <div className="mr-4 flex flex-row items-center gap-2">
            <Image
              src={"/assets/icons/telephone.svg"}
              alt="telephone"
              width={30}
              height={25}
            />
            Τηλέφωνο
          </div>
        ),
      },
      {
        accessorKey: "phone.mobile",
        header: () => (
          <div className="flex flex-row items-center gap-2">
            <Image
              src={"/assets/icons/mobile.svg"}
              alt="mobile"
              width={30}
              height={25}
            />
            Κινητό
          </div>
        ),

        enableGlobalFilter: true,
      },
      {
        accessorKey: "phone.work_phone",
        header: () => (
          <div className="flex flex-row items-center gap-2">
            <Image
              src={"/assets/icons/mobile.svg"}
              alt="mobile"
              width={30}
              height={25}
            />
            Τηλ.Εργασίας
          </div>
        ),

        enableGlobalFilter: true,
      },
      {
        accessorKey: "email",
        header: () => (
          <div className="ml-8 flex flex-row items-center justify-center gap-2">
            <Image
              alt={"email"}
              src={"/assets/icons/email.svg"}
              width={30}
              height={20}
            />{" "}
            Email
          </div>
        ),
      },
    ],
  },

  {
    id: "Dog",
    enableHiding: true,
    enableGlobalFilter: true,

    columns: [
      {
        id: "isTraining",
        accessorFn: (row) => row.isTraining,
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="Εκπαίδευση"
            imgurl="/assets/icons/training.svg"
          />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex flex-row items-center justify-center gap-2">
              {row.getValue("isTraining") ? "ΝΑΙ" : "ΟΧΙ"}
            </div>
          );
        },
      },

      {
        id: "dogGender",
        accessorFn: (row) => {
          if (row.dog) {
            const names = row.dog.map((item: any) => {
              return item.gender;
            });
            return names;
          } else {
            return null;
          }
        },
        header: "Φύλο",
        enableGlobalFilter: true,
        cell: ({ row }) => {
          const see: Array<String> = row.getValue("dogGender");
          return (
            <div className="flex flex-col gap-2">
              {see.map((name, index) => (
                <h1 key={index}> {name}</h1>
              ))}
            </div>
          );
        },
      },
      {
        header: "Γενέθλια Σκύλου",
        id: "dogBirthdate",
        accessorFn: (row) => {
          if (row.dog) {
            const names = row.dog.map((item: any) => {
              return item.birthdate;
            });
            return names;
          } else {
            return null;
          }
        },
        cell: ({ row }) => {
          const see: Array<any> = row.getValue("dogBirthdate");

          return (
            <div className="flex flex-col gap-2">
              {see.map((name, index) => (
                <h1 key={index}> {formatDateString(new Date(name))}</h1>
              ))}
            </div>
          );
        },
      },
      {
        id: "dogFood",
        accessorFn: (row) => {
          if (row.dog) {
            const names = row.dog.map((item: any) => {
              return item.food;
            });
            return names;
          } else {
            return null;
          }
        },
        header: "Είδος Τροφής",
        cell: ({ row }) => {
          const see: Array<any> = row.getValue("dogFood");

          return (
            <div className="flex flex-col gap-2">
              {see.map((name, index) => (
                <h1 key={index}> {name}</h1>
              ))}
            </div>
          );
        },
      },
      {
        id: "dogBreed",
        accessorFn: (row) => {
          if (row.dog) {
            const names = row.dog.map((item: any) => {
              return item.breed;
            });
            return names;
          } else {
            return null;
          }
        },
        header: "Ράτσα",
        cell: ({ row }) => {
          const see: Array<any> = row.getValue("dogBreed");

          return (
            <div className="flex flex-col gap-2">
              {see.map((name, index) => (
                <h1 key={index}> {name}</h1>
              ))}
            </div>
          );
        },
      },
      {
        id: "dogBehavior",
        header: "Συμπεριφορά",
        accessorFn: (row) => {
          if (row.dog) {
            const names = row.dog.map((item: any) => {
              return item.behavior;
            });
            return names;
          } else {
            return null;
          }
        },
        cell: ({ row }) => {
          const see: Array<any> = row.getValue("dogBehavior");

          return (
            <div className="flex flex-col gap-2">
              {see.map((name, index) => (
                <h1 key={index}> {name}</h1>
              ))}
            </div>
          );
        },

        filterFn: (row, id, value) => {
          const dogs: Array<any> = row.original.dog;

          return dogs.some((dog) => dog.behavior === value[0]);
        },
      },
      {
        accessorKey: "vet",
        header: "Κτηνίατρος",
      },
      {
        accessorKey: "vetNumber",
        header: "Τηλ Κτηνίατρου",
      },
    ],
  },
];
