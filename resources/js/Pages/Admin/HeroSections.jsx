import React, { useMemo, useState } from "react";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import {
    Image as ImageIcon,
    Plus,
    Search,
    Edit3,
    Trash2,
    Power,
    X,
} from "lucide-react";
import AdminLayout from "@/Components/AdminLayout";
import useSitePreferences from "@/hooks/useSitePreferences";

function Flash({ flash, dark }) {
    if (!flash?.success && !flash?.error) return null;

    return (
        <div className="mb-6 space-y-3">
            {flash.success && (
                <div
                    className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
                        dark
                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                            : "border-emerald-200 bg-emerald-50 text-emerald-700"
                    }`}
                >
                    {flash.success}
                </div>
            )}

            {flash.error && (
                <div
                    className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
                        dark
                            ? "border-red-500/20 bg-red-500/10 text-red-300"
                            : "border-red-200 bg-red-50 text-red-700"
                    }`}
                >
                    {flash.error}
                </div>
            )}
        </div>
    );
}

export default function HeroSections() {
    const { props } = usePage();
    const { isDark, isArabic } = useSitePreferences();

    const flash = props.flash || {};
    const rawSections =
        props.sections ||
        props.heroSections ||
        props.hero_sections ||
        props.items ||
        [];

    const sections = Array.isArray(rawSections?.data)
        ? rawSections.data
        : rawSections;

    const [search, setSearch] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedSection, setSelectedSection] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const createForm = useForm({
        title: "",
        subtitle: "",
        image: null,
    });

    const editForm = useForm({
        title: "",
        subtitle: "",
        image: null,
    });

    const t = useMemo(
        () => ({
            add: isArabic ? "إضافة شريحة جديدة" : "Add Hero Section",
            title: isArabic ? "العنوان" : "Title",
            subtitle: isArabic ? "العنوان الفرعي" : "Subtitle",
            image: isArabic ? "الصورة" : "Image",
            save: isArabic ? "حفظ" : "Save",
            update: isArabic ? "تحديث" : "Update",
            cancel: isArabic ? "إلغاء" : "Cancel",
            delete: isArabic ? "حذف" : "Delete",
            search: isArabic ? "ابحث عن شريحة..." : "Search hero sections...",
            active: isArabic ? "نشطة" : "Active",
            inactive: isArabic ? "معطلة" : "Inactive",
            confirmDelete: isArabic ? "تأكيد الحذف" : "Confirm Deletion",
            noItems: isArabic
                ? "لا توجد شرائح هيرو."
                : "No hero sections found.",
        }),
        [isArabic],
    );

    const filteredSections = sections.filter((item) => {
        const q = search.toLowerCase();
        return (
            item.title?.toLowerCase().includes(q) ||
            item.subtitle?.toLowerCase().includes(q)
        );
    });

    const normalizeImage = (value) => {
        if (!value) return null;
        if (
            value.startsWith("http://") ||
            value.startsWith("https://") ||
            value.startsWith("/storage")
        ) {
            return value;
        }
        return `/storage/${value}`;
    };

    const resetCreate = () => {
        createForm.reset();
        createForm.clearErrors();
        setImagePreview(null);
    };

    const handleCreateImage = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        createForm.setData("image", file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleEditImage = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        editForm.setData("image", file);
        setImagePreview(URL.createObjectURL(file));
    };

    const openEdit = (section) => {
        setSelectedSection(section);
        editForm.setData({
            title: section.title || "",
            subtitle: section.subtitle || "",
            image: null,
        });
        setImagePreview(normalizeImage(section.image));
        setShowEditModal(true);
    };

    const openDelete = (section) => {
        setSelectedSection(section);
        setShowDeleteModal(true);
    };

    const submitCreate = (e) => {
        e.preventDefault();

        createForm.post(route("admin.hero.store"), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setShowAddModal(false);
                resetCreate();
            },
        });
    };

    const submitEdit = (e) => {
        e.preventDefault();

        if (!selectedSection) return;

        editForm.post(route("admin.hero.update", selectedSection.id), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setShowEditModal(false);
                setSelectedSection(null);
                setImagePreview(null);
            },
        });
    };

    const toggleActive = (id) => {
        router.patch(
            route("admin.hero.toggle", id),
            {},
            { preserveScroll: true },
        );
    };

    const confirmDelete = () => {
        if (!selectedSection) return;

        router.delete(route("admin.hero.delete", selectedSection.id), {
            preserveScroll: true,
            onSuccess: () => {
                setShowDeleteModal(false);
                setSelectedSection(null);
            },
        });
    };

    return (
        <>
            <Head title="Admin Hero Sections - Mind Gate" />

            <AdminLayout
                title={isArabic ? "إدارة الهيرو سكشن" : "Hero Sections"}
                subtitle={
                    isArabic
                        ? "إضافة وتعديل وتفعيل وحذف شرائح الصفحة الرئيسية"
                        : "Create, update, activate, and delete homepage hero slides"
                }
                actions={
                    <button
                        type="button"
                        onClick={() => setShowAddModal(true)}
                        className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] px-5 py-3 text-sm font-semibold text-white shadow-lg"
                    >
                        <Plus className="h-4 w-4" />
                        {t.add}
                    </button>
                }
            >
                <Flash flash={flash} dark={isDark} />

                <div
                    className={`overflow-hidden rounded-3xl border shadow-lg ${
                        isDark
                            ? "border-white/10 bg-white/5"
                            : "border-slate-200 bg-white"
                    }`}
                >
                    <div
                        className={`border-b p-6 ${
                            isDark ? "border-white/10" : "border-slate-200"
                        }`}
                    >
                        <div className="relative max-w-md">
                            <Search
                                className={`absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 ${
                                    isDark ? "text-white/45" : "text-slate-400"
                                }`}
                            />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={t.search}
                                className={`w-full rounded-2xl border py-3 pl-10 pr-4 outline-none ${
                                    isDark
                                        ? "border-white/10 bg-white/5 text-white placeholder:text-white/35"
                                        : "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400"
                                }`}
                            />
                        </div>
                    </div>

                    <div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-3">
                        {filteredSections.length ? (
                            filteredSections.map((section) => (
                                <div
                                    key={section.id}
                                    className={`overflow-hidden rounded-3xl border ${
                                        isDark
                                            ? "border-white/10 bg-white/5"
                                            : "border-slate-200 bg-slate-50"
                                    }`}
                                >
                                    <div
                                        className={`h-52 ${isDark ? "bg-white/5" : "bg-slate-100"}`}
                                    >
                                        {normalizeImage(section.image) ? (
                                            <img
                                                src={normalizeImage(
                                                    section.image,
                                                )}
                                                alt={section.title}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center">
                                                <ImageIcon className="h-10 w-10 text-[#7aa7bb]" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-5">
                                        <div className="mb-3 flex items-center justify-between gap-3">
                                            <h3 className="text-lg font-bold">
                                                {section.title || "Untitled"}
                                            </h3>
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                    section.is_active
                                                        ? "bg-emerald-500/15 text-emerald-400"
                                                        : "bg-red-500/15 text-red-400"
                                                }`}
                                            >
                                                {section.is_active
                                                    ? t.active
                                                    : t.inactive}
                                            </span>
                                        </div>

                                        <p
                                            className={`min-h-[56px] text-sm leading-7 ${
                                                isDark
                                                    ? "text-white/65"
                                                    : "text-slate-600"
                                            }`}
                                        >
                                            {section.subtitle || "—"}
                                        </p>

                                        <div className="mt-5 flex flex-wrap gap-2">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    toggleActive(section.id)
                                                }
                                                className="inline-flex items-center gap-2 rounded-2xl bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-400 hover:bg-amber-500/15"
                                            >
                                                <Power className="h-4 w-4" />
                                                {section.is_active
                                                    ? isArabic
                                                        ? "تعطيل"
                                                        : "Disable"
                                                    : isArabic
                                                      ? "تفعيل"
                                                      : "Enable"}
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    openEdit(section)
                                                }
                                                className="inline-flex items-center gap-2 rounded-2xl bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400 hover:bg-blue-500/15"
                                            >
                                                <Edit3 className="h-4 w-4" />
                                                {isArabic ? "تعديل" : "Edit"}
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    openDelete(section)
                                                }
                                                className="inline-flex items-center gap-2 rounded-2xl bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 hover:bg-red-500/15"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                {t.delete}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div
                                className={`col-span-full rounded-3xl border p-10 text-center ${
                                    isDark
                                        ? "border-white/10 bg-white/5 text-white/60"
                                        : "border-slate-200 bg-slate-50 text-slate-500"
                                }`}
                            >
                                {t.noItems}
                            </div>
                        )}
                    </div>
                </div>

                {showAddModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                        <div
                            className={`w-full max-w-2xl rounded-3xl border p-6 shadow-2xl ${
                                isDark
                                    ? "border-white/10 bg-[#0b1620] text-white"
                                    : "border-slate-200 bg-white text-slate-900"
                            }`}
                        >
                            <div className="mb-5 flex items-center justify-between">
                                <h3 className="text-xl font-bold">{t.add}</h3>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddModal(false);
                                        resetCreate();
                                    }}
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <form onSubmit={submitCreate} className="space-y-5">
                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        {t.title}
                                    </label>
                                    <input
                                        type="text"
                                        value={createForm.data.title}
                                        onChange={(e) =>
                                            createForm.setData(
                                                "title",
                                                e.target.value,
                                            )
                                        }
                                        className={`w-full rounded-2xl border px-4 py-3 outline-none ${
                                            isDark
                                                ? "border-white/10 bg-white/5 text-white"
                                                : "border-slate-200 bg-slate-50"
                                        }`}
                                    />
                                    {createForm.errors.title && (
                                        <p className="mt-1 text-sm text-red-400">
                                            {createForm.errors.title}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        {t.subtitle}
                                    </label>
                                    <textarea
                                        rows="4"
                                        value={createForm.data.subtitle}
                                        onChange={(e) =>
                                            createForm.setData(
                                                "subtitle",
                                                e.target.value,
                                            )
                                        }
                                        className={`w-full rounded-2xl border px-4 py-3 outline-none resize-none ${
                                            isDark
                                                ? "border-white/10 bg-white/5 text-white"
                                                : "border-slate-200 bg-slate-50"
                                        }`}
                                    />
                                    {createForm.errors.subtitle && (
                                        <p className="mt-1 text-sm text-red-400">
                                            {createForm.errors.subtitle}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        {t.image}
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleCreateImage}
                                    />
                                    {imagePreview && (
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="mt-3 h-40 w-full rounded-2xl object-cover"
                                        />
                                    )}
                                    {createForm.errors.image && (
                                        <p className="mt-1 text-sm text-red-400">
                                            {createForm.errors.image}
                                        </p>
                                    )}
                                </div>

                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowAddModal(false);
                                            resetCreate();
                                        }}
                                        className={`rounded-2xl px-4 py-2.5 font-semibold ${
                                            isDark
                                                ? "bg-white/5 text-white"
                                                : "bg-slate-100 text-slate-800"
                                        }`}
                                    >
                                        {t.cancel}
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={createForm.processing}
                                        className="rounded-2xl bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] px-5 py-2.5 font-semibold text-white shadow-lg disabled:opacity-50"
                                    >
                                        {createForm.processing
                                            ? "Saving..."
                                            : t.save}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {showEditModal && selectedSection && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                        <div
                            className={`w-full max-w-2xl rounded-3xl border p-6 shadow-2xl ${
                                isDark
                                    ? "border-white/10 bg-[#0b1620] text-white"
                                    : "border-slate-200 bg-white text-slate-900"
                            }`}
                        >
                            <div className="mb-5 flex items-center justify-between">
                                <h3 className="text-xl font-bold">
                                    {isArabic
                                        ? "تعديل الشريحة"
                                        : "Edit Section"}
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowEditModal(false);
                                        setSelectedSection(null);
                                        setImagePreview(null);
                                    }}
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <form onSubmit={submitEdit} className="space-y-5">
                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        {t.title}
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.data.title}
                                        onChange={(e) =>
                                            editForm.setData(
                                                "title",
                                                e.target.value,
                                            )
                                        }
                                        className={`w-full rounded-2xl border px-4 py-3 outline-none ${
                                            isDark
                                                ? "border-white/10 bg-white/5 text-white"
                                                : "border-slate-200 bg-slate-50"
                                        }`}
                                    />
                                    {editForm.errors.title && (
                                        <p className="mt-1 text-sm text-red-400">
                                            {editForm.errors.title}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        {t.subtitle}
                                    </label>
                                    <textarea
                                        rows="4"
                                        value={editForm.data.subtitle}
                                        onChange={(e) =>
                                            editForm.setData(
                                                "subtitle",
                                                e.target.value,
                                            )
                                        }
                                        className={`w-full rounded-2xl border px-4 py-3 outline-none resize-none ${
                                            isDark
                                                ? "border-white/10 bg-white/5 text-white"
                                                : "border-slate-200 bg-slate-50"
                                        }`}
                                    />
                                    {editForm.errors.subtitle && (
                                        <p className="mt-1 text-sm text-red-400">
                                            {editForm.errors.subtitle}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        {t.image}
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleEditImage}
                                    />
                                    {imagePreview && (
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="mt-3 h-40 w-full rounded-2xl object-cover"
                                        />
                                    )}
                                    {editForm.errors.image && (
                                        <p className="mt-1 text-sm text-red-400">
                                            {editForm.errors.image}
                                        </p>
                                    )}
                                </div>

                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowEditModal(false);
                                            setSelectedSection(null);
                                            setImagePreview(null);
                                        }}
                                        className={`rounded-2xl px-4 py-2.5 font-semibold ${
                                            isDark
                                                ? "bg-white/5 text-white"
                                                : "bg-slate-100 text-slate-800"
                                        }`}
                                    >
                                        {t.cancel}
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={editForm.processing}
                                        className="rounded-2xl bg-gradient-to-r from-[#7aa7bb] to-[#6797ab] px-5 py-2.5 font-semibold text-white shadow-lg disabled:opacity-50"
                                    >
                                        {editForm.processing
                                            ? "Updating..."
                                            : t.update}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {showDeleteModal && selectedSection && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                        <div
                            className={`w-full max-w-md rounded-3xl border p-6 shadow-2xl ${
                                isDark
                                    ? "border-white/10 bg-[#0b1620] text-white"
                                    : "border-slate-200 bg-white text-slate-900"
                            }`}
                        >
                            <h3 className="mb-3 text-xl font-bold">
                                {t.confirmDelete}
                            </h3>
                            <p
                                className={`text-sm leading-7 ${isDark ? "text-white/65" : "text-slate-600"}`}
                            >
                                {isArabic
                                    ? `هل أنت متأكد من حذف الشريحة "${selectedSection.title}"؟`
                                    : `Are you sure you want to delete "${selectedSection.title}"?`}
                            </p>

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setSelectedSection(null);
                                    }}
                                    className={`rounded-2xl px-4 py-2.5 font-semibold ${
                                        isDark
                                            ? "bg-white/5 text-white"
                                            : "bg-slate-100 text-slate-800"
                                    }`}
                                >
                                    {t.cancel}
                                </button>

                                <button
                                    type="button"
                                    onClick={confirmDelete}
                                    className="rounded-2xl bg-red-600 px-5 py-2.5 font-semibold text-white shadow-lg"
                                >
                                    {t.delete}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </AdminLayout>
        </>
    );
}
