<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import {
  Content,
  ContentContainer,
  ContentHeader,
  ContentPageLastMod,
  ContentPageTitle,
  ContentParagraph,
  ContentParagraphTitle,
} from '@/components/ui/content'

import { DefaultLayout } from '@/layouts'

const { t } = useI18n()

useHead({
  title: t('pages.terms'),
})
</script>

<template>
  <DefaultLayout>
    <Content>
      <ContentHeader>
        <ContentPageTitle>Terms of Service</ContentPageTitle>
        <ContentPageLastMod>Last updated: May 27, 2025</ContentPageLastMod>
      </ContentHeader>
      <ContentContainer>
        <ContentParagraph
          >Please read these Terms of Service (“Terms”, “Terms of Service”) carefully before using
          the VALORY website (valory.su) and the VALORY overlay service (collectively, or
          individually, the “Service”) operated by VALORY (“us”, “we”, or “our”, “site”).Please read
          these Terms of Service (“Terms”, “Terms of Service”) carefully before using the VALORY
          website (valory.su) and the VALORY overlay service (collectively, or individually, the
          “Service”) operated by VALORY (“us”, “we”, or “our”, “site”).</ContentParagraph
        >
        <ContentParagraph
          >The Site provides the following services: a cloud-based platform that allows users to
          display their VALORANT statistics as an overlay for streaming. Authorization on the site
          is performed via Twitch (https://twitch.tv/). By accessing the Site and/or Service, you
          confirm that you have read, understood, and agree to be bound by all of these Terms and
          Conditions. If you do not agree with any of these Terms and Conditions, you are prohibited
          from using the Site and Service and must discontinue use immediately. We recommend that
          you print a copy of these Terms and Conditions for your records.
        </ContentParagraph>
        <ContentParagraphTitle>1. Acceptance of Terms </ContentParagraphTitle>
        <ContentParagraph
          >Your access to and use of the Service is conditioned upon your acceptance of and
          compliance with these Terms. These Terms apply to all visitors, users, and others who wish
          to access or use the Service. By accessing or using the Service, you agree to be bound by
          these Terms. If you disagree with any part of the terms, you do not have permission to
          access the Service.</ContentParagraph
        >
        <ContentParagraphTitle>2. Availability, Errors, and Inaccuracies </ContentParagraphTitle>
        <ContentParagraph
          >We are constantly updating the offerings on the Service. We may experience delays in
          updating information on the Service and in our advertising on other websites. Information
          found on the Service may contain errors or inaccuracies and may not be complete or
          current. We reserve the right to change or update information and to correct errors,
          inaccuracies, or omissions at any time without prior notice.</ContentParagraph
        >
        <ContentParagraphTitle>3. Accounts </ContentParagraphTitle>
        <ContentParagraph>
          When you create an account with us, you guarantee that you are above the age of 13, and
          that the information you provide us is accurate, complete, and current at all times.
          Inaccurate, incomplete, or obsolete information may result in the immediate termination of
          your account on the Service.
        </ContentParagraph>
        <ContentParagraph>
          You are responsible for maintaining the confidentiality of your account and password,
          including but not limited to the restriction of access to your computer and/or account.
          You must notify us immediately upon becoming aware of any breach of security or
          unauthorized use of your account.
        </ContentParagraph>
        <ContentParagraph>
          We reserve the right to refuse service, terminate accounts, remove or edit content, or
          suspend accounts at our sole discretion.
        </ContentParagraph>
        <ContentParagraphTitle>4. Copyright Policy </ContentParagraphTitle>
        <ContentParagraph>
          We respect the intellectual property rights of others. It is our policy to respond to any
          claim that Content posted on the Service infringes on the copyright or other intellectual
          property rights ("Infringement") of any person or entity.
        </ContentParagraph>
        <ContentParagraph>
          If you are a copyright owner or authorized on behalf of one and believe that the
          copyrighted work has been copied in a way that constitutes copyright infringement, please
          submit your claim via email <strong class="text-white">contact@valory.su</strong>. Include
          in your claim a detailed description of the alleged Infringement as outlined under "DMCA
          Notice and Procedure for Copyright Infringement Claims" below.
        </ContentParagraph>
        <ContentParagraph>
          DMCA Notice and Procedure for Copyright Infringement Claims
        </ContentParagraph>
        <ContentParagraph>
          You may submit a notification pursuant to the Digital Millennium Copyright Act (DMCA) by
          providing our Copyright Agent with the following information in writing:
        </ContentParagraph>
        <ContentParagraph>
          <ul class="list-inside list-disc space-y-2">
            <li>
              An electronic or physical signature of the person authorized to act on behalf of the
              owner of the copyright’s interest.
            </li>
            <li>A description of the copyrighted work that you claim has been infringed.</li>
            <li>
              Identification of the URL or specific location on the Service where the material that
              you claim is infringing is located.
            </li>
            <li>Your address, telephone number, and email address.</li>
            <li>
              A statement by you that you have a good faith belief that the disputed use is not
              authorized by the copyright owner, its agent, or the law.
            </li>
            <li>
              A statement by you, made under penalty of perjury, that the above information in your
              notice is accurate and that you are the copyright owner or authorized to act on the
              copyright owner’s behalf.
            </li>
          </ul>
        </ContentParagraph>
        <ContentParagraphTitle>5. Intellectual Property </ContentParagraphTitle>
        <ContentParagraph>
          The Service and its original content (excluding Content provided by users), features, and
          functionality are and will remain the exclusive property of VALORY and its licensors. The
          Service is protected by copyright, trademark, and other laws. Our trademarks and trade
          dress may not be used in connection with any product or service without our prior written
          consent.
        </ContentParagraph>
        <ContentParagraphTitle>6. Termination </ContentParagraphTitle>
        <ContentParagraph>
          We may terminate or suspend your account and bar access to the Service immediately,
          without prior notice or liability, under our sole discretion, for any reason whatsoever,
          including but not limited to a breach of the Terms.
        </ContentParagraph>
        <ContentParagraph>
          If you wish to terminate your account, please contact us to request an account deletion.
        </ContentParagraph>
        <ContentParagraph>
          All provisions of the Terms which by their nature should survive termination shall survive
          termination, including, without limitation, ownership provisions, warranty disclaimers,
          indemnity, and limitations of liability.
        </ContentParagraph>
        <ContentParagraphTitle>7. Governing Law </ContentParagraphTitle>
        <ContentParagraph>
          These Terms shall be governed and construed in accordance with the laws of the Russian
          Federation, without regard to its conflict of law provisions.
        </ContentParagraph>
        <ContentParagraph>
          Our failure to enforce any right or provision of these Terms will not be considered a
          waiver of those rights. If any provision of these Terms is held to be invalid or
          unenforceable by a court, the remaining provisions will remain in effect. These Terms
          constitute the entire agreement between us regarding our Service and supersede any prior
          agreements regarding the Service.
        </ContentParagraph>
        <ContentParagraphTitle>8. Changes </ContentParagraphTitle>
        <ContentParagraph>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any
          time. If a revision is material, we will provide at least 30 days' notice prior to any new
          terms taking effect. What constitutes a material change will be determined at our sole
          discretion.
        </ContentParagraph>
        <ContentParagraph>
          By continuing to access or use our Service after any revisions become effective, you agree
          to be bound by the revised terms. If you do not agree to the new terms, you are no longer
          authorized to use the Service.
        </ContentParagraph>
        <ContentParagraphTitle>9. Contact Us </ContentParagraphTitle>
        <ContentParagraph
          >If you have any questions about these Terms, please contact us at:
          <strong class="text-white">contact@valory.su</strong>
        </ContentParagraph>
      </ContentContainer>
    </Content>
  </DefaultLayout>
</template>
