import Image from 'next/image';
import Link from 'next/link';

export default function MemberCard({ member, custPrompt, setShowMember }) {
  let screenName, secondaryName;

  if (member.goes_by) {
    screenName = member.goes_by;
    secondaryName = member.first_name + ' ' + member.last_name;
  } else {
    screenName = member.first_name + ' ' + member.last_name;
    secondaryName = null;
  }

  return (
    <div className='member-card messy' onClick={() => setShowMember(member)}>
      <div className='details'>
        <h4>{screenName}</h4>
        {/* {secondaryName && <p className='sec-name'>{secondaryName}</p>} */}
        <p>
          {member.pronouns && member.pronouns}
          {member.pronouns && member.location && ' - '}
          {member.location && member.location}
        </p>
      </div>
      {member.avatar && (
        <div className='avatar'>
          <Image
            src={member.avatar}
            alt={`${screenName}'s avatar`}
            layout='fill'
            objectFit='contain'
          />
        </div>
      )}
      {member.custom_answer && (
        <div className='answer'>
          <p className='prompt'>{custPrompt}</p>
          <p>{member.custom_answer}</p>
        </div>
      )}
    </div>
  );
}
