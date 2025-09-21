"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from "@/components/ui/checkbox";
import React, { useEffect, useMemo, useState } from 'react';
import { format } from "date-fns";
import { categoryColors } from '@/data/categories';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ChevronDown, ChevronUp, Clock, MoreHorizontal, RefreshCcw, Search, Trash } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Input } from '@/components/ui/input';
import { XIcon } from "lucide-react";


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useFetch from '@/hooks/use-fetch';
import { bulkDeleteTransactions } from '@/app/actions/accounts';
import { toast } from 'sonner';
import { BarLoader } from 'react-spinners';

const RECURRING_INTERVAL = {
    DAILY: "Daily",
    WEEKLY: "Weekly",
    MONTHLY: "Monthly",
    YEARLY: "Yearly",
};

const TransactionTable = ({ transactions }) => {
    const router = useRouter();
    const [selectedIds, setSelectedIds] = useState([]);
    const [sortConfig, setSortConfig] = useState({
        field: "date",
        direction: "desc",
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [recurringFilter, setRecurringFilter] = useState("");


    const {
        loaading: deleteloading,
        fn:deleteFn,
        data: deleted,
    } = useFetch(bulkDeleteTransactions) ;


    const filteredAndSortedTransactions = useMemo(() => {
        let result = [...transactions]
    //  Apply Search filter
    if(searchTerm){
        const searchLower = searchTerm.toLowerCase();
        result = result.filter((transactions) =>
          transactions.description?.toLowerCase().includes(searchLower)
        );
    }

    // Apply Recurring Filter
    if(recurringFilter){
        result = result.filter((transactions) => {
            if(recurringFilter === 'recurring') return transactions.isRecurring
            return !transactions.isRecurring 
        })
    }

    // Apply type Filter
    if(typeFilter){
        result = result.filter((transactions) => transactions.type === typeFilter)
    }

    // Apply sort
    result.sort((a,b) =>{
        let comparision = 0

        switch(sortConfig.field){
            case"date":
            comparision = new Date(a.date) - new Date(b.date) ;
            break;
            case"amount":
            comparision = a.amount - b.amount;
            break;
            case "category" :
             comparision = a.category.localeCompare(b.category)
            break;

            default:
                comparision = 0 ;
        }

        return sortConfig.direction === "asc" ? comparision : -comparision ;
    });

    return result
    },[transactions,searchTerm,typeFilter,recurringFilter,sortConfig]);

    const handleSort = (field) => {
        setSortConfig((current) => ({
            field,
            direction:
                current.field === field && current.direction === "asc"
                    ? "desc"
                    : "asc",
        }));
    };

    const handleSelect = (id) => {
        setSelectedIds((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id]
        );
    };

    const handleSelectAll = () => {
        setSelectedIds((current) =>
            current.length === filteredAndSortedTransactions.length
                ? []
                : filteredAndSortedTransactions.map((t) => t.id)
        );
    };
    const handleBulkDelete = async () => {
        if(
            !window.confirm(
                `Are you Sure you want to delete${selectedIds.length} transaction?`
            )
        ){
            return;
        }
        deleteFn(selectedIds)
    }

    useEffect(() => {
        if(deleted && !deleteloading){
            toast.error("Transaction deleted succesfully");
        }
    },[deleted,deleteloading])

    const handleClearFilter = () => {
        setSearchTerm("");
        setRecurringFilter("")
        setTypeFilter("")
        setSelectedIds("")

    }
    return (
        <div className="space-y-4">
   {deleteloading &&  <BarLoader className='mt-4' width={"100%"} color="#9333ea"/>}


            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        className="pl-8"
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex gap-2.5">
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger>
                            <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Income">Income</SelectItem>
                            <SelectItem value="Expense">Expense</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={recurringFilter} onValueChange={setRecurringFilter}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="All Transactions" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="recurring">Recurring Only</SelectItem>
                            <SelectItem value="non-recurring">Non-recurring Only</SelectItem>
                        </SelectContent>
                    </Select>

                    {selectedIds.length > 0 && (
                        <div>
                        <Button variant="destructive" size ="sm" onClick={handleBulkDelete} >
                            <Trash className='h-4 w-4 mr-2'/>
                            Delete Selected ({selectedIds.length})</Button>
                        </div>
                    )}

                    {(searchTerm || typeFilter || recurringFilter) && (
                        <Button
                         variant="outline"
                         size="icon"
                         onClick = {handleClearFilter}
                         title="Clear Filter"
                        >
                            <XIcon className="h-4 w-5"/>
                        </Button>
                    )}
                </div>
            </div>

            {/* Transactions */}
            <div className="rounded-md-border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">
                                <Checkbox
                                    className="h-4 w-4"
                                    checked={
                                        selectedIds.length ===
                                        filteredAndSortedTransactions.length &&
                                        filteredAndSortedTransactions.length > 0
                                    }
                                    onCheckedChange={handleSelectAll}
                                />
                            </TableHead>
                            <TableHead
                                className="cursor-pointer"
                                onClick={() => handleSort("date")}
                            >
                                <div className="flex items-center">
                                    Date{" "}
                                    {sortConfig.field === "date" &&
                                        (sortConfig.direction === "asc" ? (
                                            <ChevronUp className="ml-1 h-4 w-4" />
                                        ) : (
                                            <ChevronDown className="ml-1 h-4 w-4" />
                                        ))}
                                </div>
                            </TableHead>
                            <TableHead
                                className="cursor-pointer"
                                onClick={() => handleSort("description")}
                            >
                                <div className="flex items-center">
                                    Description
                                    {sortConfig.field === "description" &&
                                        (sortConfig.direction === "asc" ? (
                                            <ChevronUp className="ml-1 h-4 w-4" />
                                        ) : (
                                            <ChevronDown className="ml-1 h-4 w-4" />
                                        ))}
                                </div>
                            </TableHead>
                            <TableHead
                                className="cursor-pointer"
                                onClick={() => handleSort("category")}
                            >
                                <div className="flex items-center">
                                    Category
                                    {sortConfig.field === "category" &&
                                        (sortConfig.direction === "asc" ? (
                                            <ChevronUp className="ml-1 h-4 w-4" />
                                        ) : (
                                            <ChevronDown className="ml-1 h-4 w-4" />
                                        ))}
                                </div>
                            </TableHead>
                            <TableHead
                                className="cursor-pointer"
                                onClick={() => handleSort("amount")}
                            >
                                <div className="flex items-center justify-end">
                                    Amount
                                    {sortConfig.field === "amount" &&
                                        (sortConfig.direction === "asc" ? (
                                            <ChevronUp className="ml-1 h-4 w-4" />
                                        ) : (
                                            <ChevronDown className="ml-1 h-4 w-4" />
                                        ))}
                                </div>
                            </TableHead>
                            <TableHead>Recurring</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAndSortedTransactions.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    className="text-center text-muted-foreground"
                                >
                                    No Transaction Found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredAndSortedTransactions.map((t) => (
                                <TableRow key={t.id}>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedIds.includes(t.id)}
                                            onCheckedChange={() => handleSelect(t.id)}
                                        />
                                    </TableCell>
                                    <TableCell>{format(new Date(t.date), "PP")}</TableCell>
                                    <TableCell>{t.description}</TableCell>
                                    <TableCell className="capitalize">
                                        <span
                                            style={{
                                                background: categoryColors[t.category],
                                                padding: "2px 6px",
                                                borderRadius: "4px",
                                                color: "#fff",
                                            }}
                                        >
                                            {t.category}
                                        </span>
                                    </TableCell>
                                    <TableCell
                                        className="text-right font-medium"
                                        style={{
                                            color: t.type === "EXPENSE" ? "red" : "green",
                                        }}
                                    >
                                        {t.type === "EXPENSE" ? "-" : "+"}${t.amount.toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        {t.isRecurring ? (
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Badge
                                                        variant="outline"
                                                        className="gap-1 bg-purple-100 text-purple-700 hover:bg-purple-200"
                                                    >
                                                        <RefreshCcw className="h-3 w-3" />
                                                        {RECURRING_INTERVAL[t.recurringInterval]}
                                                    </Badge>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <div>
                                                        <div className="font-medium">Next Date:</div>
                                                        <div className="text-sm">
                                                            {format(
                                                                new Date(t.nextRecurringDate),
                                                                "PP"
                                                            )}
                                                        </div>
                                                    </div>
                                                </TooltipContent>
                                            </Tooltip>
                                        ) : (
                                            <Badge variant="outline" className="gap-1">
                                                <Clock className="h-3 w-3" />
                                                One_time
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <Button
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        router.push(
                                                            `/transactions/create?edit=${t.id}`
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-destructive"
                                                onClick={() => deleteFn([transactions.id])}
                                                >
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default TransactionTable;
