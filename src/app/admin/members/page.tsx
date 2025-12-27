import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import { formatDate } from '@/shared/utils';
import { Title, Text } from '@/shared/ui/Typography';
import { AdminActions } from '@/shared/ui/AdminActions';

const PlusIcon = () => <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>;

export const dynamic = 'force-dynamic';

export default async function MembersListPage() {
    const members = await db.boardMember.findMany({
        orderBy: { start_date: 'desc' }
    });

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-end">
                <div>
                    <Title className="!text-5xl mb-3 tracking-tight">Состав</Title>
                    <Text className="!text-xl text-gray-500 font-medium">Команда студсовета и активисты</Text>
                </div>
                <Link
                    href="/admin/members/new"
                    className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-3xl shadow-xl shadow-blue-200 transition-all active:scale-95"
                >
                    <PlusIcon />
                    <span className="font-bold text-xl">Добавить участника</span>
                </Link>
            </div>

            <div className="bg-white rounded-[3rem] shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-12 py-8 text-base font-extrabold text-gray-400 uppercase tracking-wider w-[180px]">Фото</th>
                        <th className="px-12 py-8 text-base font-extrabold text-gray-400 uppercase tracking-wider w-1/3">Участник</th>
                        <th className="px-12 py-8 text-base font-extrabold text-gray-400 uppercase tracking-wider">Контакты & Инфо</th>
                        <th className="px-12 py-8 text-base font-extrabold text-gray-400 uppercase tracking-wider">Дата вступления</th>
                        <th className="px-12 py-8 text-base font-extrabold text-gray-400 uppercase tracking-wider text-right">Действия</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {members.map((member) => (
                        <tr key={member.id} className="hover:bg-gray-50/50 transition-colors group">
                            <td className="px-12 py-8 align-middle">
                                <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden bg-gray-100 relative border border-gray-200 shrink-0 shadow-sm">
                                    {member.image ? (
                                        <Image src={`/api/storage/${member.image}`} fill className="object-cover" alt={member.name} />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300 font-bold text-lg">
                                            NO IMG
                                        </div>
                                    )}
                                </div>
                            </td>

                            <td className="px-12 py-8 align-middle">
                                <Title className="line-clamp-1 mb-2 !text-3xl !font-bold tracking-tight">
                                    {member.name}
                                </Title>
                                <span className="inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-lg font-bold">
                                    {member.position}
                                </span>
                            </td>

                            <td className="px-12 py-8 align-middle">
                                <div className="flex flex-col gap-2">
                                    {member.telegram_link && (
                                        <a href={`https://t.me/${member.telegram_link.replace('@', '').replace('https://t.me/', '')}`} target="_blank" className="text-blue-500 hover:text-blue-700 font-bold text-xl flex items-center gap-2 w-fit">
                                            <span className="text-2xl">✈️</span>
                                            {member.telegram_link.startsWith('@') ? member.telegram_link : `@${member.telegram_link}`}
                                        </a>
                                    )}
                                    <Text className="text-gray-400 line-clamp-1 !text-lg mt-1 font-medium">
                                        {member.description || 'Нет описания'}
                                    </Text>
                                </div>
                            </td>

                            <td className="px-12 py-8 align-middle">
                                <Text className="font-bold text-gray-900 !text-2xl">
                                    {formatDate(member.start_date).split(',')[0]}
                                </Text>
                                <div className="text-gray-400 text-lg mt-1 font-medium">
                                    {formatDate(member.start_date).split(',')[1]}
                                </div>
                            </td>

                            <td className="px-12 py-8 align-middle text-right">
                                <AdminActions
                                    id={member.id}
                                    basePath="/admin/members"
                                    apiPath="/board_members"
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {members.length === 0 && (
                    <div className="p-32 text-center text-gray-400 text-2xl font-medium">
                        Список участников пуст
                    </div>
                )}
            </div>
        </div>
    );
}
