import Image from 'next/image';

export default function MemberModal({ member, custPrompt }) {
  let screenName;

  if (member.goes_by) {
    screenName = member.goes_by;
    const secondaryName = member.first_name + ' ' + member.last_name;
  } else {
    screenName = member.first_name + ' ' + member.last_name;
  }

  return (
    <div className='member-modal messy'>
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
      <div className='details'>
        <h4 className='no-break'>{screenName}</h4>
        {secondaryName && <p className='sec-name'>{secondaryName}</p>}
        {member.pronouns && (
          <p>
            <span>pronouns</span>
            {member.pronouns}
          </p>
        )}
        {member.location && (
          <p>
            <span>location</span> {member.location}
          </p>
        )}
        {member.interests && (
          <p>
            <span>interests</span>
            {member.interests}
          </p>
        )}
        {member.pets && (
          <p>
            <span>pets</span>
            {member.pets}
          </p>
        )}
        {member.link && (
          <>
            <span>🔗</span>
            <a href={'//' + member.link}>{member.link}</a>
          </>
        )}
      </div>
      {member.custom_answer && (
        <div className='answer'>
          <p className='prompt'>{custPrompt}</p>
          <p>{member.custom_answer}</p>
        </div>
      )}
    </div>
  );
}
