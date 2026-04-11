import React from "react";
import { Head, usePage, Link } from "@inertiajs/react";
import {
    Users,
    MessageSquare,
    Image,
    Activity,
    BookOpenText,
    Building2,
    ClipboardList,
    HeartPulse,
} from "lucide-react";
import AdminSidebar from "@/Components/AdminSidebar";

function StatCard({ title, value, icon: Icon, color, note }) {
    return (
        <div className={`rounded-2xl shadow-lg p-6 text-white ${color}`}>
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-white/80 text-sm">{title}</p>
                    <h3 className="text-3xl font-bold mt-2">{value}</h3>
                </div>
                <div className="bg-white/15 p-3 rounded-xl">
                    <Icon className="w-6 h-6" />
                </div>
            </div>
            {note ? <p className="mt-4 text-sm text-white/80">{note}</p> : null}
        </div>
    );
}

export default function Dashboard() {
    const { props } = usePage();

    const admin = props.admin || {};
    const stats = props.stats || {};
    const latestUsers = props.latest_users || [];
    const latestMessages = props.latest_messages || [];

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Head title="Admin Dashboard - Mind Gate" />

            <div className="ml-64 p-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black">
                            Mind Gate Dashboard
                        </h1>
                        <p className="mt-2 text-sm text-slate-400">
                            Welcome back{admin?.name ? `, ${admin.name}` : ""}.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 mb-8">
                    <StatCard
                        title="Users"
                        value={stats.users || 0}
                        icon={Users}
                        color="bg-gradient-to-br from-blue-600 to-blue-800"
                        note={`Inactive: ${stats.inactive_users || 0}`}
                    />

                    <StatCard
                        title="Messages"
                        value={stats.messages || 0}
                        icon={MessageSquare}
                        color="bg-gradient-to-br from-amber-500 to-orange-700"
                        note={`Unread: ${stats.unread_messages || 0}`}
                    />

                    <StatCard
                        title="Specialists"
                        value={stats.specialists || 0}
                        icon={HeartPulse}
                        color="bg-gradient-to-br from-emerald-600 to-emerald-800"
                        note="Active specialist records"
                    />

                    <StatCard
                        title="Resources"
                        value={stats.resources || 0}
                        icon={BookOpenText}
                        color="bg-gradient-to-br from-violet-600 to-violet-800"
                        note="Published resource items"
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 mb-8">
                    <StatCard
                        title="Assessments"
                        value={stats.assessments || 0}
                        icon={ClipboardList}
                        color="bg-gradient-to-br from-pink-600 to-pink-800"
                        note="Stored initial assessments"
                    />

                    <StatCard
                        title="Daily Check-ins"
                        value={stats.checkins || 0}
                        icon={Activity}
                        color="bg-gradient-to-br from-cyan-600 to-cyan-800"
                        note="Saved follow-up entries"
                    />

                    <StatCard
                        title="Organizations"
                        value={stats.organizations || 0}
                        icon={Building2}
                        color="bg-gradient-to-br from-green-600 to-green-800"
                        note="Registered organizations"
                    />

                    <StatCard
                        title="Hero Sections"
                        value={stats.hero_sections || 0}
                        icon={Image}
                        color="bg-gradient-to-br from-indigo-600 to-indigo-800"
                        note="Homepage hero records"
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <div className="overflow-hidden rounded-2xl bg-slate-900 shadow-lg">
                        <div className="flex items-center justify-between border-b border-slate-800 p-6">
                            <h3 className="text-xl font-bold">Latest Users</h3>
                            <Link
                                href="/admin/users"
                                className="text-sm font-semibold text-blue-400 hover:underline"
                            >
                                View All
                            </Link>
                        </div>

                        <div className="divide-y divide-slate-800">
                            {latestUsers.length > 0 ? (
                                latestUsers.map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex items-center p-5"
                                    >
                                        <div className="mr-4 flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold">
                                            {(user.name || "?")
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>

                                        <div className="flex-grow">
                                            <p className="font-semibold text-white">
                                                {user.name || "Unknown User"}
                                            </p>
                                            <p className="text-sm text-slate-400">
                                                {user.email || "No email"}
                                            </p>
                                        </div>

                                        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                                            {user.created_at
                                                ? new Date(
                                                      user.created_at,
                                                  ).toLocaleDateString()
                                                : "Unknown"}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="p-6 text-center text-slate-400">
                                    No users found
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl bg-slate-900 shadow-lg">
                        <div className="flex items-center justify-between border-b border-slate-800 p-6">
                            <h3 className="text-xl font-bold">
                                Latest Messages
                            </h3>
                            <Link
                                href="/admin/messages"
                                className="text-sm font-semibold text-blue-400 hover:underline"
                            >
                                View All
                            </Link>
                        </div>

                        <div className="divide-y divide-slate-800">
                            {latestMessages.length > 0 ? (
                                latestMessages.map((message) => (
                                    <div key={message.id} className="p-5">
                                        <div className="mb-2 flex items-center justify-between">
                                            <div>
                                                <p className="font-semibold text-white">
                                                    {message.name ||
                                                        "Unknown Sender"}
                                                </p>
                                                <p className="text-sm text-slate-400">
                                                    {message.email ||
                                                        "No email"}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {!message.is_read && (
                                                    <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
                                                )}
                                                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                                                    {message.created_at
                                                        ? new Date(
                                                              message.created_at,
                                                          ).toLocaleDateString()
                                                        : "Unknown"}
                                                </span>
                                            </div>
                                        </div>

                                        <p className="truncate text-sm text-slate-300">
                                            {message.subject ||
                                                message.message ||
                                                "No content"}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="p-6 text-center text-slate-400">
                                    No messages found
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <AdminSidebar />
        </div>
    );
}
