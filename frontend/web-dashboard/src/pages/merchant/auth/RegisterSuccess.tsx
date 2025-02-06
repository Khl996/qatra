
import {
    Box,
    Heading,
    Text,
    Container,
    VStack
} from '@chakra-ui/react';

const RegisterSuccess = () => {
    return (
        <Container maxW="container.md" py={10}>
            <VStack spacing={8} align="center">
                <Heading size="xl">تم تسجيل طلبك بنجاح</Heading>
                <Text fontSize="lg">
                    شكراً لتسجيلك في نظام قطرة. سيتم مراجعة طلبك من قبل المسؤولين وسيتم إعلامك بالنتيجة قريباً.
                </Text>
                <Text fontSize="md" color="gray.500">
                    يمكنك تسجيل الدخول بعد الموافقة على طلبك.
                </Text>
            </VStack>
        </Container>
    );
};

export default RegisterSuccess;