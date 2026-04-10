import React, { useMemo, useState } from "react";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import {
    Search,
    Plus,
    Pencil,
    Trash2,
    X,
    ToggleLeft,
    ToggleRight,
    Image as ImageIcon,
} from "lucide-react";
import AdminLayout from "@/Layouts/AdminLayout";

function FlashBanner({ flash }) {
    if (!flash?.success && !flash?.error) return null;

    const isError = !!flash.error;
    const text = flash.error || flash.success;

    return (
        <div
            className={`mb-6 rounded-2xl border px-4 py-3 text-sm font-semibold ${
                isError
                    ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900/40 dark:bg-red-500/10 dark:text-red-300"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-500/10 dark:text-emerald-300"
            }`}
        >
            {text}
        </div>
    );
}

export default function HeroSections({ auth, heroSections = [] }) {
    const { props } = usePage();
    const flash = props.flash || {};

    const locale =
        typeof window !== "undefined"
            ? localStorage.getItem("mindgate_locale") || "en"
            : "en";

    const isArabic = locale === "ar";

    const t = useMemo(
        () => ({
            title: isArabic ? "الهيرو" : "Hero Sections",
            search: isArabic ? "ابحث في الهيرو..." : "Search hero sections...",
            add: isArabic ? "إضافة قسم" : "Add section",
            edit: isArabic ? "تعديل القسم" : "Edit section",
            create: isArabic ? "حفظ القسم" : "Create section",
            update: isArabic ? "تحديث القسم" : "Update section",
            delete: isArabic ? "حذف" : "Delete",
            cancel: isArabic ? "إلغاء" : "Cancel",
            titleField: isArabic ? "العنوان" : "Title",
            subtitleField: isArabic ? "الوصف" : "Subtitle",
            imageField: isArabic ? "الصورة" : "Image",
            optional: isArabic ? "اختياري" : "Optional",
            noItems: isArabic
                ? "لا توجد أقسام هيرو."
                : "No hero sections found.",
            active: isArabic ? "نشط" : "Active",
            inactive: isArabic ? "معطل" : "Inactive",
            addImageRequired: isArabic
                ? "الصورة مطلوبة عند الإضافة."
                : "Image is required when creating.",
            untitled: isArabic ? "بدون عنوان" : "Untitled",
            noSubtitle: isArabic ? "بدون وصف" : "No subtitle",
        }),
        [isArabic],
    );

    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const { data, setData, post, processing, reset, errors } = useForm({
        title: "",
        subtitle: "",
        image: null,
    });

    const filtered = heroSections.filter((item) => {
        const q = searchQuery.toLowerCase().trim();
        if (!q) return true;

        return (
            (item.title || "").toLowerCase().includes(q) ||
            (item.subtitle || "").toLowerCase().includes(q)
        );
    });

    const openCreate = () => {
        setEditingItem(null);
        reset();
        setImagePreview(null);
        setShowModal(true);
    };

    const openEdit = (item) => {
        setEditingItem(item);
        setData({
            title: item.title || "",
            subtitle: item.subtitle || "",
            image: null,
        });
        setImagePreview(item.image || null);
        setShowModal(true);
    };

    const closeModal = () => {
        setEditingItem(null);
        reset();
        setImagePreview(null);
        setShowModal(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0] || null;
        setData("image", file);
        setImagePreview(
            file ? URL.createObjectURL(file) : editingItem?.image || null,
        );
    };

    const submit = (e) => {
        e.preventDefault();

        if (!editingItem && !data.image) {
            return;
        }

        if (editingItem) {
            post(route("admin.hero.update", editingItem.id), {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: closeModal,
            });
        } else {
            post(route("admin.hero.store"), {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: closeModal,
            });
        }
    };

    const toggleStatus = (id) => {
        router.patch(
            route("admin.hero.toggle", id),
            {},
            { preserveScroll: true },
        );
    };

    const deleteItem = (id) => {
        router.delete(route("admin.hero.delete", id), { preserveScroll: true });
    };

    return (
        <AdminLayout title={t.title} auth={auth}>
            <Head title={`${t.title} - Mind Gate`} />
            <FlashBanner flash={flash} />

            <div className="space-y-6">
                <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#7aa7bb]/10 px-3 py-1 text-xs font-extrabold text-[#7aa7bb]">
                                <ImageIcon size={14} />
                                Mind Gate
                            </div>

                            <h2 className="mt-4 text-2xl font-extrabold text-slate-900 dark:text-white">
                                {t.title}
                            </h2>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row xl:w-[480px]">
                            <div className="relative flex-1">
                                <Search
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={18}
                                />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    placeholder={t.search}
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-[#7aa7bb] dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                />
                            </div>

                            <button
                                onClick={openCreate}
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#7aa7bb] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#6797ab]"
                            >
                                <Plus size={16} />
                                {t.add}
                            </button>
                        </div>
                    </div>
                </section>

                <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {filtered.length > 0 ? (
                        filtered.map((item) => (
                            <div
                                key={item.id}
                                className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-[#111827]"
                            >
                                <div className="relative h-52 bg-slate-100 dark:bg-slate-900">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.title || "Hero"}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-slate-400">
                                            <ImageIcon size={34} />
                                        </div>
                                    )}

                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 py-4">
                                        <div className="flex items-end justify-between gap-3">
                                            <div className="min-w-0">
                                                <p className="truncate text-lg font-extrabold text-white">
                                                    {item.title || t.untitled}
                                                </p>
                                                <p className="mt-1 line-clamp-1 text-sm text-white/80">
                                                    {item.subtitle ||
                                                        t.noSubtitle}
                                                </p>
                                            </div>

                                            <span
                                                className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                                                    item.is_active
                                                        ? "bg-emerald-100 text-emerald-700"
                                                        : "bg-amber-100 text-amber-700"
                                                }`}
                                            >
                                                {item.is_active
                                                    ? t.active
                                                    : t.inactive}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-3 px-5 py-4">
                                    <div className="text-xs text-slate-400">
                                        {item.created_at
                                            ? new Date(
                                                  item.created_at,
                                              ).toLocaleDateString()
                                            : "-"}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => openEdit(item)}
                                            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
                                        >
                                            <Pencil size={16} />
                                        </button>

                                        <button
                                            onClick={() =>
                                                toggleStatus(item.id)
                                            }
                                            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
                                        >
                                            {item.is_active ? (
                                                <ToggleRight size={18} />
                                            ) : (
                                                <ToggleLeft size={18} />
                                            )}
                                        </button>

                                        <button
                                            onClick={() => deleteItem(item.id)}
                                            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-rose-200 text-rose-600 transition hover:bg-rose-50 dark:border-rose-900/40 dark:text-rose-400 dark:hover:bg-rose-500/10"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full rounded-3xl border border-dashed border-slate-300 px-4 py-12 text-center text-sm text-slate-400 dark:border-slate-700">
                            {t.noItems}
                        </div>
                    )}
                </section>

                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
                        <div className="w-full max-w-2xl rounded-[32px] border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-[#111827]">
                            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                                    {editingItem ? t.edit : t.add}
                                </h3>

                                <button
                                    onClick={closeModal}
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <form onSubmit={submit} className="space-y-5 p-6">
                                <div className="grid gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">
                                            {t.titleField}{" "}
                                            <span className="text-slate-400">
                                                ({t.optional})
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.title}
                                            onChange={(e) =>
                                                setData("title", e.target.value)
                                            }
                                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#7aa7bb] dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                        />
                                        {errors.title && (
                                            <p className="mt-2 text-xs text-red-500">
                                                {errors.title}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">
                                            {t.subtitleField}{" "}
                                            <span className="text-slate-400">
                                                ({t.optional})
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.subtitle}
                                            onChange={(e) =>
                                                setData(
                                                    "subtitle",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#7aa7bb] dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                        />
                                        {errors.subtitle && (
                                            <p className="mt-2 text-xs text-red-500">
                                                {errors.subtitle}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">
                                        {t.imageField}
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#7aa7bb] dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                    />
                                    {!editingItem && (
                                        <p className="mt-2 text-xs text-slate-400">
                                            {t.addImageRequired}
                                        </p>
                                    )}
                                    {errors.image && (
                                        <p className="mt-2 text-xs text-red-500">
                                            {errors.image}
                                        </p>
                                    )}
                                </div>

                                {imagePreview && (
                                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="h-56 w-full object-cover"
                                        />
                                    </div>
                                )}

                                <div className="flex items-center justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                                    >
                                        {t.cancel}
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-2xl bg-[#7aa7bb] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#6797ab] disabled:opacity-60"
                                    >
                                        {editingItem ? t.update : t.create}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
