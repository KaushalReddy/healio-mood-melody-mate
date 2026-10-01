import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

export const formatDate = (d: string) =>
  new Date(d).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

type Props<T> = {
  title: string;
  items: T[] | undefined;
  empty: string;
  render: (item: T) => ReactNode;
  onDelete: (item: T) => void;
  getId: (item: T) => string;
};

export function History<T>({ title, items, empty, render, onDelete, getId }: Props<T>) {
  return (
    <Card className="w-full max-w-md mx-auto healio-card">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 max-h-[420px] overflow-y-auto">
        {!items && <p className="text-sm text-muted-foreground">Loading…</p>}
        {items?.length === 0 && <p className="text-sm text-muted-foreground">{empty}</p>}
        {items?.map((item) => (
          <div key={getId(item)} className="flex items-start justify-between gap-2 rounded-lg border p-3">
            <div className="min-w-0 flex-1">{render(item)}</div>
            <Button variant="ghost" size="icon" aria-label="Delete" onClick={() => onDelete(item)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
