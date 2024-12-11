"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  FileText,
  History,
  Coins,
  Mail,
  Smartphone,
  CreditCard,
  Wallet,
  Link2,
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

export function QuickActions() {
  return (
    <Card className="border-t-4 border-t-purple-500/50">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button asChild className="w-full justify-start" variant="outline">
          <Link href="/dashboard/transactions/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Link>
        </Button>

        <Button asChild className="w-full justify-start" variant="outline">
          <Link href="/dashboard/settings?tab=categories">
            <Coins className="mr-2 h-4 w-4" />
            Manage Categories
          </Link>
        </Button>

        <Button asChild className="w-full justify-start" variant="outline">
          <Link href="/dashboard/reports">
            <FileText className="mr-2 h-4 w-4" />
            View Reports
          </Link>
        </Button>

        <Button asChild className="w-full justify-start" variant="outline">
          <Link href="/dashboard/transactions">
            <History className="mr-2 h-4 w-4" />
            Transaction History
          </Link>
        </Button>

        <div className="pt-2 border-t">
          <p className="text-sm font-medium mb-3">Connect Services</p>
          <div className="space-y-2">
            <Button
              asChild
              className="w-full justify-start group hover:border-purple-500/50 transition-colors"
              variant="outline"
            >
              <Link href="/dashboard/connect">
                <Mail className="mr-2 h-4 w-4 group-hover:text-purple-500" />
                Connect Gmail
              </Link>
            </Button>

            <Button
              className="w-full justify-start opacity-75"
              variant="outline"
              disabled
            >
              <Smartphone className="mr-2 h-4 w-4" />
              Connect SMS
              <span className="ml-auto text-[10px] font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-2 py-0.5 rounded-full">
                Coming Soon
              </span>
            </Button>

            <Button className="w-full justify-start" variant="outline" disabled>
              <CreditCard className="mr-2 h-4 w-4" />
              Connect Cards
              <span className="ml-auto text-[10px] bg-yellow-200/50 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 px-1.5 py-0.5 rounded">
                Soon
              </span>
            </Button>

            <Button className="w-full justify-start" variant="outline" disabled>
              <Wallet className="mr-2 h-4 w-4" />
              Connect UPI
              <span className="ml-auto text-[10px] bg-yellow-200/50 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 px-1.5 py-0.5 rounded">
                Soon
              </span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
