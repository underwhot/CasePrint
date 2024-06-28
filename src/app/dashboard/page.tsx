import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { db } from "@/db";
import { formatPrice } from "@/lib/utils";
import { getUser } from "@workos-inc/authkit-nextjs";
import { redirect } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusDropdown from "./status-dropdown";

const WEEK_GOAL = 500;
const MONTHLY_GOAL = 1000;

export default async function DashboardPage() {
  const { user } = await getUser();

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

  if (!user || user?.email !== ADMIN_EMAIL) {
    return redirect("/");
  }

  const orders = await db.order.findMany({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      shippingAddress: true,
    },
  });

  const lastWeekSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
    _sum: {
      amount: true,
    },
  });

  const lastMonthSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
    },
    _sum: {
      amount: true,
    },
  });

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-3xl">Dashboard</h1>
      <div className="mb-4 flex flex-col gap-4 md:flex-row [&>*]:flex-[1_1_50%]">
        <Card>
          <CardHeader>
            <CardDescription>Week Summary</CardDescription>
            <CardTitle>{formatPrice(lastWeekSum?._sum.amount || 0)}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              of {formatPrice(WEEK_GOAL)} goal
            </p>
          </CardContent>
          <CardFooter>
            <Progress
              value={((lastWeekSum?._sum.amount || 0) * 100) / WEEK_GOAL}
            />
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Month Summary</CardDescription>
            <CardTitle>{formatPrice(lastMonthSum?._sum.amount || 0)}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              of {formatPrice(MONTHLY_GOAL)} goal
            </p>
          </CardContent>
          <CardFooter>
            <Progress
              value={((lastMonthSum?._sum.amount || 0) * 100) / MONTHLY_GOAL}
            />
          </CardFooter>
        </Card>
      </div>

      <h2 className="my-4 text-2xl">Recent Orders</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Purches date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <p className="font-medium capitalize">
                  {order.shippingAddress?.firstName +
                    " " +
                    order.shippingAddress?.lastName}
                </p>
                <p className="text-muted-foreground">{order.user.email}</p>
              </TableCell>
              <TableCell>
                <StatusDropdown id={order.id} orderStatus={order.status} />
              </TableCell>
              <TableCell>{order.createdAt.toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                {formatPrice(order.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
