"use client"
import React from 'react'
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
   DrawerTitle
} from "@/components/ui/drawer"

  

const CreateAccountDrawer = ({children}) => {
    const [open , setOpen] = React.useState(false);
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger>{children}</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
 
    )
}

export default CreateAccountDrawer
