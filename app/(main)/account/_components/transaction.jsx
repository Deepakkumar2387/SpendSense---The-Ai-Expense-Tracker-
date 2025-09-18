"use client"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Checkbox } from "@/components/ui/checkbox";
import React from 'react'
import { forbidden } from 'next/navigation';
import { format } from "date-fns";
import { categoryColors } from '@/data/categories';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Clock, RefreshCcw } from 'lucide-react';


const RECURRING_INTERVAL = {
    DAILY: "Daily",
    WEEKLY: "Weekly",
    MONTHLY: "Monthly",
    YEARLY: "Yearly",
}

const TransactionTable = ({ transactions }) => {

    const filteredAndSortedTransactions = transactions
    const handleSort = () => { };
    return (
        <div className='space-y-4'>
            {/* Filters */}

            {/* Transactions */}
            <div className='rounded-md-border  '>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">
                                <Checkbox className="h-4 w-4" />
                            </TableHead>
                            <TableHead className="cursor-pointer"
                                onClick={() => handleSort("date")}
                            >
                                <div className='flex items-center'>Date</div>
                            </TableHead>
                            <TableHead className="cursor-pointer"
                                onClick={() => handleSort("description")}
                            >
                                <div className='flex items-center'>Description</div>
                            </TableHead>
                            <TableHead className="cursor-pointer"
                                onClick={() => handleSort("category")}
                            >
                                <div className='flex items-center'>Category</div>
                            </TableHead>
                            <TableHead className="cursor-pointer"
                                onClick={() => handleSort("amount")}
                            >
                                <div className='flex items-center justify-end'>Amount</div>
                            </TableHead>
                            <TableHead>
                                Recurring
                            </TableHead>
                            <TableHead>

                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAndSortedTransactions.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7}
                                    className="text-center text-muted-foreground">
                                    No Transaction Found
                                </TableCell>

                            </TableRow>
                        ) : (
                            filteredAndSortedTransactions.map((transactions) => (
                                <TableRow key={transactions.id}>
                                    <TableCell>
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell>{format(new Date(transactions.date), "PP")}</TableCell>
                                    <TableCell>{transactions.description}</TableCell>
                                    <TableCell className="capitalize">
                                        <span
                                            style={{
                                                background: categoryColors[transactions.category],
                                                padding: "2px 6px",
                                                borderRadius: "4px",
                                                color: "#fff",
                                            }}
                                        >
                                            {transactions.category}
                                        </span>
                                    </TableCell>

                                    <TableCell
                                        className="text-right font-medium "
                                        style={{
                                            color: transactions.type === "EXPENSE" ? "red" : "green",
                                        }}
                                    >
                                        {transactions.type === "EXPENSE" ? "-" : "+"}
                                        ${transactions.amount.toFixed(2)}
                                    </TableCell>

                                    <TableCell>
                                        {transactions.isRecurring?(
                                            <Tooltip>
                                            <TooltipTrigger>
                                            <Badge variant= "outline" className='gap-1 bg-purple-100 text-purple-700 hover:bg-purple-200' >
                                                <RefreshCcw className='h-3 w-3' />
                                                {RECURRING_INTERVAL[
                                                    transactions.recurringInterval
                                                ]}
                                                </Badge>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              <div>
                                                <div className='font-medium'>Next Date:</div>
                                                <div className='text-sm'>
                                                    {format(new Date(transactions.nextRecurringDate),"PP")}
                                                </div>
                                              </div>
                                            </TooltipContent>
                                          </Tooltip>
                                        ) : (
                                            <Badge variant= "outline" className='gap-1' >
                                                <Clock className='h-3 w-3' />
                                                One_time</Badge>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default TransactionTable
