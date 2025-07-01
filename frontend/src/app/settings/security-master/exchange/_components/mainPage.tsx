"use client";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import { serialize } from "@/libs/searchparams";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, List, Plus, PlusIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/libs/utils";
import ExchangeListing from "./ExchangeListing";
import { useSearchParams } from "next/navigation";
import PageHeader from '@/components/layout/PageHeader';
import Dashboard from './Dashboard/layout';

export const metadata = {
  title: "Exchange CRUD Table",
};

export default function MainPage() {
  const searchParams = useSearchParams();
  const key = serialize(Object.fromEntries(searchParams.entries()));
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [formType, setFormType] = useState('');
  const [isDisplayDashboard, setIsDisplayDashboard] = useState(false);

  const addNew = () => {
    // setSelectedItem(null);
    setFormType('Create');
    setIsCreatePopupOpen(true);
  };

    const ctaButtons = [
    {
      label: 'Overview',
      icon: isDisplayDashboard ? <List /> : <LayoutDashboard />,
      onClick: () => setIsDisplayDashboard(!isDisplayDashboard),
      isButton: false
    },
    ...(!isDisplayDashboard
      ? [
          {
            label: 'Add Vendor',
            icon: <PlusIcon />,
            onClick: addNew,
            type: 'button',
            title: `Add Vendor`,
            isButton: true
          }
        ]
      : [])
  ];

  return (
    <PageContainer scrollable={false}>
      <div className="wrapper-width space-y-4">
        <PageHeader title='Exchange' ctaButtons={ctaButtons} />
       
        <Separator />

        {isDisplayDashboard ? (
          <Dashboard title='' />
        ) : (
        <Suspense
          key={key}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <ExchangeListing
            isCreatePopupOpen={isCreatePopupOpen}
            setIsCreatePopupOpen={setIsCreatePopupOpen}
            formType={formType}
            setFormType={setFormType}
          />
        </Suspense>
        )}
      </div>
    </PageContainer>
  );
}