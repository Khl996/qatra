import { useState } from 'react';
import {
    Box,
    Stack,
    Card,
    CardHeader,
    CardBody,
    Heading,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    FormControl,
    FormLabel,
    Input,
    Switch,
    Button,
    useToast
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppDispatch';
import { updateProfile } from '../../../store/slices/authSlice';

interface ProfileState {
    name: string;
    email: string;
    phone: string;
    address: string;
    category: string;
}

const SettingsPage = () => {
    const dispatch = useAppDispatch();
    const toast = useToast();
    const { user } = useAppSelector(state => state.auth);
    const [settings, setSettings] = useState({
        notifications: {
            email: true,
            push: true,
            sms: false
        },
        pointsRate: 1, // نقطة لكل ريال
        autoApprove: false
    });

    const [profile, setProfile] = useState<ProfileState>({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
        category: user?.category || ''
    });

    const handleProfileUpdate = async () => {
        try {
            if (!user?.id) return;
            
            await dispatch(updateProfile({
                id: user.id,
                ...profile
            })).unwrap();
            toast({
                title: 'تم تحديث الملف الشخصي',
                status: 'success',
                duration: 3000
            });
        } catch (err) {
            toast({
                title: 'حدث خطأ',
                description: 'لم نتمكن من تحديث الملف الشخصي',
                status: 'error',
                duration: 3000
            });
        }
    };

    return (
        <Stack spacing={6}>
            <Card>
                <CardHeader>
                    <Heading size="md">الإعدادات</Heading>
                </CardHeader>
                <CardBody>
                    <Tabs>
                        <TabList>
                            <Tab>الملف الشخصي</Tab>
                            <Tab>الإشعارات</Tab>
                            <Tab>نقاط الولاء</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <Stack spacing={4}>
                                    <FormControl>
                                        <FormLabel>اسم المتجر</FormLabel>
                                        <Input 
                                            value={profile.name}
                                            onChange={e => setProfile({
                                                ...profile,
                                                name: e.target.value
                                            })}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>البريد الإلكتروني</FormLabel>
                                        <Input 
                                            value={profile.email}
                                            onChange={e => setProfile({
                                                ...profile,
                                                email: e.target.value
                                            })}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>رقم الجوال</FormLabel>
                                        <Input 
                                            value={profile.phone}
                                            onChange={e => setProfile({
                                                ...profile,
                                                phone: e.target.value
                                            })}
                                        />
                                    </FormControl>
                                    <Button colorScheme="blue" onClick={handleProfileUpdate}>
                                        حفظ التغييرات
                                    </Button>
                                </Stack>
                            </TabPanel>

                            <TabPanel>
                                <Stack spacing={4}>
                                    <FormControl display="flex" alignItems="center">
                                        <FormLabel mb="0">إشعارات البريد الإلكتروني</FormLabel>
                                        <Switch 
                                            isChecked={settings.notifications.email}
                                            onChange={e => setSettings({
                                                ...settings,
                                                notifications: {
                                                    ...settings.notifications,
                                                    email: e.target.checked
                                                }
                                            })}
                                        />
                                    </FormControl>
                                    <FormControl display="flex" alignItems="center">
                                        <FormLabel mb="0">إشعارات الجوال</FormLabel>
                                        <Switch 
                                            isChecked={settings.notifications.push}
                                            onChange={e => setSettings({
                                                ...settings,
                                                notifications: {
                                                    ...settings.notifications,
                                                    push: e.target.checked
                                                }
                                            })}
                                        />
                                    </FormControl>
                                </Stack>
                            </TabPanel>

                            <TabPanel>
                                <Stack spacing={4}>
                                    <FormControl>
                                        <FormLabel>معدل النقاط (نقطة/ريال)</FormLabel>
                                        <Input 
                                            type="number"
                                            value={settings.pointsRate}
                                            onChange={e => setSettings({
                                                ...settings,
                                                pointsRate: Number(e.target.value)
                                            })}
                                        />
                                    </FormControl>
                                    <FormControl display="flex" alignItems="center">
                                        <FormLabel mb="0">موافقة تلقائية على النقاط</FormLabel>
                                        <Switch 
                                            isChecked={settings.autoApprove}
                                            onChange={e => setSettings({
                                                ...settings,
                                                autoApprove: e.target.checked
                                            })}
                                        />
                                    </FormControl>
                                </Stack>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </CardBody>
            </Card>
        </Stack>
    );
};

export default SettingsPage;
